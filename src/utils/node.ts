/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Editor } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import type { EditorState } from '@tiptap/pm/state';

export function isTitleNode(node: Node): boolean {
  return node && node.type.name === 'title';
}

export function isBulletListNode(node: Node): boolean {
  return node && node.type.name === 'bulletList';
}

export function isOrderedListNode(node: Node): boolean {
  return node && node.type.name === 'orderedList';
}

export function isTodoListNode(node: Node): boolean {
  return node && node.type.name === 'taskList';
}

export function isListNode(node: Node): boolean {
  return isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node);
}

export function getCurrentNode(state: EditorState): any {
  const $head = state.selection.$head;
  let node = null;

  for (let d = $head.depth; d > 0; d--) {
    node = $head.node(d);
  }

  return node;
}

export function getNodeAtPos(state: EditorState, pos: number): any {
  const $head = state.doc.resolve(pos);
  let node = null;

  for (let d = $head.depth; d > 0; d--) {
    node = $head.node(d);
  }

  return node;
}

export function isInCustomNode(state: EditorState, nodeName: string): boolean {
  if (!state.schema.nodes[nodeName])
    return false;

  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--) {
    if ($head.node(d).type === state.schema.nodes[nodeName]) {
      return true;
    }
  }
  return false;
}

export function isInCodeBlock(state: EditorState): boolean {
  return isInCustomNode(state, 'codeBlock');
}

export function isInTitle(state: EditorState): boolean {
  if (state?.selection?.$head?.pos === 0)
    return true;
  return isInCustomNode(state, 'title');
}

export function isInCallout(state: EditorState): boolean {
  return isInCustomNode(state, 'callout');
}

export function findNode(editor: Editor, name: string) {
  const content = editor.getJSON();
  const queue = [content];
  const res = [];

  while (queue.length > 0) {
    const node = queue.shift() as any;

    if (node.type === name) {
      res.push(node);
    }

    if (node.content && node.content.length > 0) {
      queue.push(...node.content);
    }
  }

  return res;
}

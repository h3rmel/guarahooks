import { toc } from 'mdast-util-toc';
import { remark } from 'remark';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];

function flattenNode(node: Node) {
  const p: string[] = [];
  visit(node, (n) => {
    if (!('type' in n)) return;
    if (!textTypes.includes(n.type as string)) return;
    if ('value' in n) {
      const value = (n as { value?: string }).value;
      if (typeof value === 'string') {
        p.push(value);
      }
    }
  });
  return p.join('');
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

function getItems(node: Node | null | undefined, current: Item): Item | Items {
  if (!node) {
    return current;
  }

  if (node.type === 'paragraph') {
    visit(node, (item) => {
      if (item.type === 'link') {
        const linkNode = item as Node & { url: string };
        current.url = linkNode.url;
        current.title = flattenNode(node);
      }

      if (item.type === 'text') {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === 'list') {
    const listNode = node as Parent;
    current.items = (listNode.children || []).map((i: Node) => {
      const result = getItems(i, {} as Item);
      return result as Item;
    });

    return current;
  } else if (node.type === 'listItem') {
    const listItemNode = node as Parent;
    const children = listItemNode.children || [];
    const heading = getItems(children[0], {} as Item) as Item;

    if (children.length > 1) {
      const childResult = getItems(children[1], heading);
      if ('items' in childResult && childResult.items) {
        heading.items = childResult.items;
      }
    }

    return heading;
  }

  return current;
}

function getToc() {
  return function (tree: Node, file: { data: unknown }) {
    const table = toc(tree as Parameters<typeof toc>[0]);
    const result = getItems(table.map, {} as Item);
    file.data = result as Items;
  };
}

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string,
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return (result.data || {}) as TableOfContents;
}

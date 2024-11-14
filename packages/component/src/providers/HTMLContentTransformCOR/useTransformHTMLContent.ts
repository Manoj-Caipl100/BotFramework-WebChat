import { hooks } from 'botframework-webchat-api';
import { useCallback } from 'react';

import useCodeBlockTag from '../CustomElements/useCodeBlockTagName';
import useHTMLContentTransformContext from './private/useHTMLContentTransformContext';

const { useLocalizer, useStyleOptions } = hooks;

const DEFAULT_ALLOWED_TAGS: ReadonlyMap<string, Readonly<{ attributes: ReadonlySet<string> }>> = Object.freeze(
  new Map(
    (
      [
        ['a', ['aria-label', 'class', 'href', 'name', 'rel', 'target']],
        ['b', []],
        ['blockquote', []],
        ['br', []],
        ['button', ['aria-label', 'class', 'type', 'value']],
        ['caption', []],
        ['code', ['data-math-type']],
        ['del', []],
        ['div', []],
        ['em', []],
        ['figure', ['data-math-type']],
        ['h1', []],
        ['h2', []],
        ['h3', []],
        ['h4', []],
        ['h5', []],
        ['h6', []],
        ['hr', []],
        ['i', []],
        ['img', ['alt', 'aria-label', 'class', 'src', 'title']],
        ['ins', []],
        ['li', []],
        ['nl', []],
        ['ol', []],
        ['p', []],
        ['pre', ['class', 'data-math-type']],
        ['s', []],
        ['span', ['aria-label', 'data-math-type']],
        ['strike', []],
        ['strong', []],
        ['table', []],
        ['tbody', []],
        ['td', []],
        ['tfoot', []],
        ['th', []],
        ['thead', []],
        ['tr', []],
        ['ul', []],

        // Followings are for MathML elements, from https://developer.mozilla.org/en-US/docs/Web/MathML.
        ['annotation-xml', []],
        ['annotation', []],
        ['math', []],
        ['merror', []],
        ['mfrac', []],
        ['mi', []],
        ['mmultiscripts', []],
        ['mn', []],
        ['mo', []],
        ['mover', []],
        ['mpadded', []],
        ['mphantom', []],
        ['mprescripts', []],
        ['mroot', []],
        ['mrow', []],
        ['ms', []],
        ['mspace', []],
        ['msqrt', []],
        ['mstyle', []],
        ['msub', []],
        ['msubsup', []],
        ['msup', []],
        ['mtable', []],
        ['mtd', []],
        ['mtext', []],
        ['mtr', []],
        ['munder', []],
        ['munderover', []],
        ['semantics', []]
      ] satisfies [string, string[]][]
    ).map(
      ([tag, attributes]) =>
        [tag, Object.freeze({ attributes: Object.freeze(new Set(attributes)) })] satisfies [
          string,
          Readonly<{ attributes: ReadonlySet<string> }>
        ]
    )
  )
);

export default function useTransformHTMLContent(): (documentFragment: DocumentFragment) => DocumentFragment {
  const [{ codeBlockTheme }] = useStyleOptions();
  const [codeBlockTagName] = useCodeBlockTag();
  const { transform } = useHTMLContentTransformContext();

  const localize = useLocalizer();
  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  return useCallback(
    documentFragment =>
      transform({
        allowedTags: DEFAULT_ALLOWED_TAGS,
        codeBlockTagName,
        codeBlockTheme,
        documentFragment,
        externalLinkAlt
      }),
    [codeBlockTagName, codeBlockTheme, externalLinkAlt, transform]
  );
}

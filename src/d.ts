import {parser} from "lezer-d"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent, continuedIndent} from "@codemirror/language"

export const dLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        LabeledStatement: flatIndent,
        IfExpression: continuedIndent({except: /^\s*({|else\b)/}),
        TryStatement: continuedIndent({except: /^\s*({|catch|finally)\b/})
      }),
      foldNodeProp.add({
        Application: foldInside,
        BlockStatement: foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}, nesting: {open: "/+", close: "+/"}},
    indentOnInput: /^\s*(\{|case |default:|finally )$/
  }
})

export function d() {
  return new LanguageSupport(dLanguage)
}

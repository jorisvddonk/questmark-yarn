# QuestMark-Yarn

This is a very experimental compiler from [Yarn Spinner](https://yarnspinner.dev/) to the [QuestMark QuestVM (Tzo)](https://github.com/jorisvddonk/questmark) specification, which allows Yarn Spinner scripts to be executed in a wide variety of environments for which there is a [Tzo](https://github.com/jorisvddonk/tzo) or QuestVM implementation (currently: C, TypeScript, Rust - though creating one for another language isn't particularly difficult due to the simple nature of the Tzo VM)

The parser/lexer grammar is kept in sync with Yarn Spinner 3.x, so scripts using the current language version parse without errors.

Not everything is supported, but basic scripts might work, with possibly some modifications.

## Language support

The grammar parses the full Yarn Spinner 3.x language, but only a subset is compiled to QuestVM/Tzo bytecode:

| Yarn Spinner feature | Status |
| --- | --- |
| Lines, shortcut options (`->`), line groups (`=>`) | Supported |
| `if` / `elseif` / `else` | Supported |
| `set`, `jump` (node name), arbitrary commands, `title:` headers | Supported |
| `<<once>>` / `<<else>>` / `<<endonce>>` | Supported (conditions on `once` are ignored) |
| `when:` headers, node/tag headers | Parsed, ignored |
| `<<declare>>`, `<<enum>>` | Parsed, ignored (provide defaults from the host) |
| `<<detour>>` / `<<return>>` | Not supported (warns) |
| `<<jump <expression>>` | Not supported (warns) |
| `<<call>>` | Not supported |

Anything not supported can usually be expressed directly in Tzo bytecode instead.

## Notes

Many basic constructs should compile to QuestVM/Tzo bytecode easily. Advanced Yarn scripts have not been tested.

Arbitrary Tzo ConciseText code can be inserted via `<<$ BYTECODE_HERE >>`. In case functionality does not work or is not implemented, it's recommended to resort to Tzo bytecode instead.

## Usage

```sh
npx questmark-yarn --input input.yarn --output yarn_out.json
```

The .json can then be interpreted via the QuestMark QuestVM interpreter:

```sh
npx questmark --input yarn_out.json
```

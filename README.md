# QuestMark-Yarn

This is a very experimental compiler from [Yarn Spinner 2.0](https://yarnspinner.dev/) to the [QuestMark QuestVM (Tzo)](https://github.com/jorisvddonk/questmark) specification, which allows Yarn Spinner scripts to be executed in a wide variety of environments for which there is a [Tzo](https://github.com/jorisvddonk/tzo) or QuestVM implementation (currently: C, TypeScript, Rust - though creating one for another language isn't particularly difficult due to the simple nature of the Tzo VM)

Not everything is supported, but basic scripts might work, with some modifications

## Usage

Many basic constructs should compile to QuestVM/Tzo bytecode easily, but see the Limitations section below for information on options and how to make sure they work correctly. Advanced Yarn scripts have not been tested.

Arbitrary Tzo ConciseText code can be inserted via `<<$ BYTECODE_HERE >>`. In case functionality does not work or is not implemented, it's recommended to resort to Tzo bytecode instead.

## Limitations

The current compiler can't infer the entire scope of option lists, i.e. it can't figure out when a list of options ends, so you've got to declare those manually, via `<<RESPONSE>>`:

```yarn
-> This is option 1
    This is the response of option 1
-> This is option 2
    This is the response of option 2
-> This is option 3
<<RESPONSE>>
```

## Usage

```sh
npx questmark-yarn --input input.yarn --output yarn_out.json
```

The .json can then be interpreted via the QuestMark QuestVM interpreter:

```sh
npx questmark --input yarn_out.json
```

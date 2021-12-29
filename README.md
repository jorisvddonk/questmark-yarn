# QuestMark-Yarn

This is a very experimental compiler from [Yarn Spinner 2.0](https://yarnspinner.dev/) to the [QuestMark QuestVM (Tzo)](https://github.com/jorisvddonk/questmark) specification, which allows Yarn Spinner scripts to be executed in a wide variety of environments for which there is a [Tzo](https://github.com/jorisvddonk/tzo) or QuestVM implementation (currently: C, TypeScript, Rust - though creating one for another language isn't particularly difficult due to the simple nature of the Tzo VM)

Not everything is supported, but basic scripts might work, with possibly some modifications.

## Usage

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

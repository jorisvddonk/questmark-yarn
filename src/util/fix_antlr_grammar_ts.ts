import glob from "glob";
import fs from "fs";

glob.sync("./grammars/*/Yarn*.ts").forEach((fname: any) => {
  let src = fs.readFileSync(fname).toString();
  src = `// @ts-nocheck\n${src}`;
  fs.writeFileSync(fname, src, { encoding: 'utf-8' });
});

// TODO: include an import for IndentAwareLexer!!!

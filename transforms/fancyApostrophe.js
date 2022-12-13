// A small codemod to replace ' (&quot;) with ’ (&rsquo;) in the situations that it should be replaced

function replaceApostrophes(str) {
  return str.replace("\\'", '’').replace("'", '’').replace('&quot;', '’');
}

S('Literal').each((literal) => {
  const literalValue = literal.text();
  if (!["'", '"', '`'].includes(literalValue[0])) return;

  const newLiteralValue = `${literalValue[0]}${replaceApostrophes(
    literalValue.slice(1, -1)
  )}${literalValue[0]}`;

  literal.text(newLiteralValue);
});

S('JSXText').text((old) => replaceApostrophes(old));

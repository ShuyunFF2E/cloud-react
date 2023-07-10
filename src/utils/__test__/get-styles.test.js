import getCssText from '../get-styles';

it('get-styles none rules', () => {
  const styleText = '.red {color: red;}';
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleText;
  document.head.appendChild(style);
  expect(getCssText('.sand')).toEqual([]);
  document.head.removeChild(style);
});

it('get-styles text get', () => {
  const styleText = '.red {color: red;}';
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleText;
  document.head.appendChild(style);
  style.sheet.rules = style.sheet.cssRules;
  expect(getCssText('.sand')).toEqual([ '.sand .red{color: red;}' ]);
  document.head.removeChild(style);
});

it('get-styles media type get', () => {
  const styleText = '@media only screen and (max-width: 600px) {.blue {color: lightblue;}}';
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleText;
  document.head.appendChild(style);
  style.sheet.rules = style.sheet.cssRules;
  expect(getCssText('.sand')).toEqual([ styleText ]);
  document.head.removeChild(style);
});

it('get-styles none param', () => {
  const styleText = '.red {color: red;}';
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleText;
  document.head.appendChild(style);
  style.sheet.rules = style.sheet.cssRules;
  expect(getCssText()).toEqual([ '.red {color: red;}' ]);
  document.head.removeChild(style);
});

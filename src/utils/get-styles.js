function getCssText(customParentSeletor) {
  const styles = [...document.head.querySelectorAll('link[rel="stylesheet"],style')];

  const CSSStyleList = styles
    .filter(style => {
      try {
        if (style.sheet && style.sheet.rules.length) {
          return true;
        }
      } catch (e) {
        // return false;
      }
      return false;
    })
    .map(style => [...style.sheet.rules]);

  const cssTexts = CSSStyleList.reduce((acc, CSSRules) => {
    acc.push(...CSSRules);

    return acc;
  }, []).map(({ cssText, selectorText }) => {
    if (/^@/.test(cssText)) {
      return cssText;
    }

    if (customParentSeletor) {
      const _selectorText = selectorText.replace(/^(.)/, `${customParentSeletor} $1`).replace(/(,)/g, `$1 ${customParentSeletor} `);
      return cssText.replace(/^[^{]+/, _selectorText);
    }

    return cssText;
  });

  return cssTexts;
}

export default getCssText;

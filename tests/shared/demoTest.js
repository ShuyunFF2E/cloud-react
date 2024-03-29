import glob from 'glob';
import { render } from 'enzyme';

// We should avoid use it in 4.0. Reopen if can not handle this.
const USE_REPLACEMENT = false;
const testDist = process.env.LIB_DIR === 'dist';

/**
 * rc component will generate id for aria usage.
 * It's created as `test-uuid` when env === 'test'.
 * Or `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env.
 * So we need hack of this to modify the `aria-controls`.
 */
function ariaConvert(wrapper) {
  if (!testDist || !USE_REPLACEMENT) return wrapper;

  const matches = new Map();

  function process(entry) {
    const { attribs, children } = entry;
    if (matches.has(entry)) return;
    matches.set(entry, true);

    // Change aria
    if (attribs && attribs['aria-controls']) {
      attribs['aria-controls'] = ''; // Remove all the aria to keep render sync in jest & jest node
    }

    // Loop children
    if (!children) return;
    (Array.isArray(children) ? children : [children]).forEach(process);
  }

  Object.keys(wrapper).forEach((key) => {
    const entry = wrapper[key];
    process(entry);
  });

  return wrapper;
}

export default function demoTest(component, options = {}) {
  const files = glob.sync(`./src/components/${component}/demos/*.markdown`);

  files.forEach((file) => {
    let testMethod = options.skip === true ? test.skip : test;
    if (
      Array.isArray(options.skip) &&
      options.skip.some((c) => file.includes(c))
    ) {
      testMethod = test.skip;
    }
    testMethod(`renders ${file} correctly`, () => {
      const demo = require(`../.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
      console.log(demo);
      const wrapper = render(demo);

      // Convert aria related content
      ariaConvert(wrapper);

      expect(wrapper).toMatchSnapshot();
    });
  });
}

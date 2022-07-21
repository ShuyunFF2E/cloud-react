import React from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Cascade from '../index';

// const data = [{ 
// 	id: '1',
// 	title:'你进这扇门是为了让国家看到真理',
// 	},
// 	{ 
// 	id: '2',
// 	title:'唯独不敢怠慢真心',
// 	},
// 	{ 
// 	id: '3',
// 	title:'狭隘的爱情留不住雄鹰',
// 	},
// 	{ 
// 	id: '4',
// 	title:'麻雀也会好奇老鹰会飞多高',
// 	},
// 	{ 
// 	id: '5',
// 	title:'人生当如蜡烛，从头燃到尾，始终光明',
// 	}
// ]

describe('oneCascade', () => {
	mountTest(Cascade);
	// it('should not clickable when Cascade is disabled ', () => {
	// 	const handleClick = jest.fn();
	// 	const wrapper = mount(
	// 		<Cascade disabled data={data} onChange={handleClick} />
	// 	);

	// 	wrapper.simulate('click');
	// 	expect(handleClick).not.toHaveBeenCalled();
	// });
	
});

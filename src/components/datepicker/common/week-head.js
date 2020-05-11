import React from 'react';

const WeekHead = () => {
	const miniWeek = ['日', '一', '二', '三', '四', '五', '六'];

	return (
		<thead>
			<tr>
				{miniWeek.map((e, i) => (
					<th key={i.toString()}>{e}</th>
				))}
			</tr>
		</thead>
	);
};

export default WeekHead;

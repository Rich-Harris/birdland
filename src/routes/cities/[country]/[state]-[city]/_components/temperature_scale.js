import * as yootils from 'yootils';

const hue_scale = yootils.linearScale([-10, 45], [180, 360]);

export const get_color = temperature => {
	const hue = hue_scale(temperature);
	return `hsl(${hue}deg, 100%, 75%)`;
}
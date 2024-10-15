import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, isButton, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa fa-${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	color: ${({ disabled }) => (disabled ? '#ccc' : 'inherit')};

	&:hover {
		cursor: ${({ isButton }) => (isButton ? 'pointer' : 'default')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	isButton: PropTypes.bool,
};

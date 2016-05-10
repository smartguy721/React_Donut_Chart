var ChartBox = React.createClass({
	render: function() {
		return (
			<div className="chartBox">
				Hello there!
			</div>
		);
	}
});

ReactDOM.render(
	<ChartBox />,
	document.getElementById('donut-chart')
);
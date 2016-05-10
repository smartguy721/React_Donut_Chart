var DonutChartBox = React.createClass({
	loadChartDataFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ data: data });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadChartDataFromServer();
	},
	render: function() {
		return (
			<div className="dount-chart">
				<ChartLabelList data={this.state.data} />
			</div>
		);
	}
});

ReactDOM.render(
	<DonutChartBox />,
	document.getElementById('donut-chart-block')
);
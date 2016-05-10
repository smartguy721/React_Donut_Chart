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

var ChartLabelList = React.createClass({
	render: function() {
		var sectionLabels = this.props.data.map(function(section) {
			return (
				<SectionLabel key={section.id}>
					{section.label}
				</SectionLabel>
			);
		});
		return (
			<div className="label-list">
				{ sectionLabels }
			</div>
		);
	}
});

var SectionLabel = React.createClass({
	render: function() {
		return (
			<span className="functional-name">
				{ this.props.children.toString() }
			</span>
		);
	}
});

ReactDOM.render(
	<DonutChartBox url="/api/data" />,
	document.getElementById('donut-chart-block')
);
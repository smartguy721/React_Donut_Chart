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
			<div className="donut-chart">
				<ChartList data={this.state.data} />
			</div>
		);
	}
});

var ChartList = React.createClass({
	render: function() {
		var sectionLabels = this.props.data.map(function(section) {
			return (
				<SectionLabel key={section.id} sectionId={section.id} >
					{section.label}
				</SectionLabel>
			);
		});
		var sectionClips = this.props.data.map(function(section) {
			return (
				<SectionClip key={section.id} sectionId={section.id} color={section.color} >
					{section.portion}
				</SectionClip>
			)
		});
		return (
			<div className="label-list">
				{ sectionLabels }
				{ sectionClips }
				<div className="center"></div>
			</div>
		);
	}
});

var SectionLabel = React.createClass({
	render: function() {
		return (
			<span className={ "functional-name-" + this.props.sectionId }>
				{ this.props.children.toString() }
			</span>
		);
	}
});

var SectionClip = React.createClass({
	render: function() {
		
		return (
			<div id={"section" + this.props.sectionId} className="clip">
				<div className="item" style={{background: this.props.color }} data-rel={this.props.children}></div>
			</div>
		)
	}
});

ReactDOM.render(
	<DonutChartBox url="/api/data" />,
	document.getElementById('donut-chart-block')
);
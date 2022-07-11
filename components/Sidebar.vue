<template>
	<div id="sidebar-wrapper">
		<ul class="sidebar-nav">
			
			<li>
				<a href="#">
					<font-awesome-icon icon="fas fa-chart-area" />
					<span>Dashboard</span>
				</a>
			</li>
			<li>
				<a href="#">
					<font-awesome-icon icon="fas fa-table" />
					<span>Tabele</span>
				</a>
			</li>
			<li>
				<a href="#">
					<font-awesome-icon icon="fas fa-desktop" />
					<span>Reports</span>
				</a>
			</li>
			<li class="active">
				<a href="#">
					<font-awesome-icon icon="fas fa-chart-pie" />
					<span>Graphs</span>
				</a>
			</li>
			<li>
				<a href="#">
					<font-awesome-icon icon="fas fa-power-off" />
					<span>Log of</span>
				</a>
			</li>
		
		</ul>
	</div>
</template>

<script>
export default {
	name: "Sidebar"
}
</script>

<style scoped>

</style>
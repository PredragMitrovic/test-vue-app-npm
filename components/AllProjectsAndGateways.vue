<template>
	<div>
		<p class="font-weight-bold">All projects | All gateways</p>
		<template v-for="project in getterProject" >
			<div class="table-wrapper">
				<div class="accordion-wrapper">
					<div class="accordion">
						<input type="radio" name="radio-a" :id="'check' + project.projectId" checked>
						<label class="accordion-label" :for="'check' + project.projectId">{{ project.name }}</label>
						<div class="accordion-content">
							<div class="table-wrapper">
								<table class="table">
									<tbody>
									<tr>
										<td>Name:</td>
										<td>{{project.name}}</td>
										<td>Rule:</td>
										<td>{{project.rule}}</td>
									</tr>
									<tr>
										<td>Structure:</td>
										<td>{{project.structure}}</td>
										<td>Industry:</td>
										<td>{{project.industry}}</td>
									</tr>
									<tr>
										<td>Website:</td>
										<td>{{project.website}}</td>
										<td>Description:</td>
										<td>{{project.description}}</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: "AllProjectsAndGateways",
	props: {
		reports: { type: Object },
		projects: { type: Object },
		gateways: { type: Object },
	},
	methods: {
	
	}
}
</script>

<style scoped>

</style>
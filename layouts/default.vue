<template>
    <div>
        <main-header :toggleMenu="toggleMenu" @clicked="onClickChild"/>
	    
	    <div id="wrapper" :class="{ toggled: toggleMenu }">
		
		    <!-- Sidebar -->
		    <sidebar></sidebar>
		    <!-- /#sidebar-wrapper -->
		
		    <!-- Page Content -->
		    <div id="page-content-wrapper">
			    <Nuxt />
		    </div>
		    <!-- /#page-content-wrapper -->
	
	    </div>

    </div>
</template>

<script>


import MainHeader from '../components/MainHeader.vue';
import Sidebar from '../components/Sidebar.vue';
export default {
    components: {
	    MainHeader,
	    Sidebar
    },
	data() {
		return {
			toggleMenu: false
		}
	},
	
	methods: {
		onClickChild (value) {
			this.toggleMenu = value
			
			console.log(value)
		}
	}
}
</script>


<style>
</style>
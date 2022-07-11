<template>
	<nav class="navbar navbar-expand-lg navbar-dark ">
		<a class="navbar-brand" href="#">
			<img src="~/assets/img/logo.png" />
		</a>
		<a href="#" id="menu-toggle" class="btn"
		   @click="myMenuToggle"
		>
			<img src="~/assets/img/hamburger.png" />
		</a>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			
			<div class="navbar-nav ml-auto">
				<template v-if="getterUser.length" >
					<div class="user-short"><p>{{getterUser[0].firstName.charAt(0)}}{{getterUser[0].lastName.charAt(0)}}</p></div>
					<p class="m-auto p-2 user-full">{{getterUser[0].firstName}} {{getterUser[0].lastName}}</p>
				</template>
			</div>
		
		</div>
	</nav>
</template>

<script>
import { mapGetters , mapActions} from 'vuex';
    export default {
	    props: ['toggleMenu'],
	    data() {
		    return {
			    showMobileMenu: false
		    }
	    },
	    methods: {
		    myMenuToggle: function() {
			    this.showMobileMenu = !this.showMobileMenu;
			    this.$emit('clicked', this.showMobileMenu)
		    },
		    ...mapActions([
			    'GET_USER'
		    ])
	    },
	    computed: {
		    ...mapGetters([
			    'getterUser',
		    ])
	    },
		created() {
			this.GET_USER();
		}

    }
</script>

<style lang="scss" scoped>

</style>
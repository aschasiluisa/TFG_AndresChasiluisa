<script lang="ts" src="./Header.ts"></script>

<template>
  <header>

    <div class="selectorIdioma">
      <p>Español</p>
      <input class="tgl tgl-ios" id="cb2" type="checkbox"/>
      <label class="tgl-btn" for="cb2"></label>
      <p>English</p>
    </div>

    <div class="tituloPagina">
      <h1>VISOR LA PALMA</h1>
    </div>

    <nav>
        <router-link to="/visorLaPalma" class="headerLink" v-show="noIsCurrentRoute(`/visorLaPalma`) && noSuperAdmin"> Visor la palma</router-link> 
        <router-link to="/visorLaPalma/login" class="headerLink" v-show="!userAuthenticated && noIsCurrentRoute(`/visorLaPalma/login`)"> Login</router-link> 
        <router-link to="/visorLaPalma/signup" class="headerLink" v-show="!userAuthenticated && noIsCurrentRoute(`/visorLaPalma/signup`)"> Signup</router-link> 
        <router-link to="/visorLaPalma/profile" class="headerLink" v-show="userAuthenticated && noIsCurrentRoute(`/visorLaPalma/profile`) && noSuperAdmin"> Profile</router-link>
        <router-link to="/visorLaPalma/login" @click="logout" class="headerLink" v-show="userAuthenticated">Logout</router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>

  @import "@/css/globalStyles.scss";

  header {
      height: 10%;
      background-color: $primary-color;
      display: grid;
      grid-template-columns: 20% 60% 20%;
      align-items: center;
  }

  .selectorIdioma{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-column: 1;
    
    p:first-child{
      color: white;
      margin: 9% 4% 10% 10%;
    }

    p:last-child{
      color: white;
      margin: 9% 10% 10% 4%;
    }

  }

  .tgl {
	display: none;
  
	// add default box-sizing for this scope
	&,
  &:after,
  &:before,
	& *,
  & *:after,
  & *:before,
	& + .tgl-btn {
		box-sizing: border-box;
		&::selection {
			background: none;
		}
	}
  
	+ .tgl-btn {
		outline: 0;
		display: block;
		width: 3em;
		height: 1.5em;
		position: relative;
		cursor: pointer;
    user-select: none;
		&:after,
    &:before {
			position: relative;
			display: block;
			content: "";
			width: 50%;
			height: 100%;
		}
    
		&:after {
			left: 0;
		}
    
		&:before {
			display: none;
		}
	}
  
	&:checked + .tgl-btn:after {
		left: 50%;
	}
}


.tgl-ios {
	+ .tgl-btn {
		background: $secondary-color;
		border-radius: 2em;
		padding: 2px;
		transition: all .4s ease;
		border: 1px solid #e8eae9;
		&:after {
			border-radius: 2em;
			background: #e8eae9;
			transition:
        left .3s cubic-bezier(
          0.175, 0.885, 0.320, 1.275
        ),
        padding .3s ease, margin .3s ease;
			box-shadow:
        0 0 0 1px rgba(0,0,0,.1),
        0 4px 0 rgba(0,0,0,.08);
		}
    
    &:hover:after {
      will-change: padding;
    }
    
		&:active {
			box-shadow: inset 0 0 0 2em #e8eae9;
			&:after {
				padding-right: .8em;
			}
		}
	}
  
	&:checked + .tgl-btn {
    background: $secondary-color;
    &:active {
      box-shadow: none;
      &:after {
        margin-left: -.8em;
      }
    }
	}
}

  .tituloPagina{
    text-align: center;
    align-items: center;
    grid-column: 2;

    h1 {
      color: white;
      font-family: Cambria bold;
      padding-top: 0.85% ;
    }
  }

  nav {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      grid-column: 3;
  }

  .headerLink {
      color: white;
      align-self: center;
      text-decoration: none;
      cursor: pointer;
      margin-right: 10%;
  }

</style>
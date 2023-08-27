<script lang="ts" src="./ElementInfo.ts"></script>

<template>
  <div v-if="getElementInfoID == 1 && getRegistroInfo" class="containerCalidadAireInfo">
    <h6 style="margin-bottom: 15px;">
        {{ $t('ElementInfo.estacion') }} {{ getRegistroInfo.Nombre }}
    </h6>

    <table class="tablaCalidadAireInfo">
        <tr>
            <th>{{ $t('ElementInfo.fecha') }}</th>
            <th>{{ $t('ElementInfo.temperatura') }}</th>
            <th>{{ $t('ElementInfo.humedad') }}</th>
        </tr>
        <tr>
            <td>{{ getRegistroInfo.Fecha }}</td>
            <td>{{ getRegistroInfo.Temperatura }} ºC </td>
            <td>{{ getRegistroInfo.Humedad }} % </td>
        </tr>
    </table>

    <table class="tablaCalidadAireInfo">
        <tr>
            <th colspan="4"> Registros en μg/m³ </th>
        </tr>
        <tr>
            <td v-if="getRegistroInfo.CO != 0 && getRegistroInfo.CO != 1" 
                :class = "{ 
                                'CO _1' : getRegistroInfo.CO < 500, 
                                'CO _2' : getRegistroInfo.CO >= 500 && getRegistroInfo.CO < 1000,
                                'CO _3' : getRegistroInfo.CO >= 1000 && getRegistroInfo.CO < 1500,
                                'CO _4' : getRegistroInfo.CO >= 1500 && getRegistroInfo.CO < 2000,
                                'CO _5' : getRegistroInfo.CO >= 2000 
                            }"
            > 
                CO 
                <button class="gasesMedicion" onmouseover=""> 
                    ? 
                    <GasesMedicion class="medicion CO" :info="'CO'" />
                </button> 
            </td>
            <td v-if="getRegistroInfo.NO2 != 0 && getRegistroInfo.NO2 != 1"
                :class = "{
                                'gases _1' : getRegistroInfo.NO2 < 40, 
                                'gases _2' : getRegistroInfo.NO2 >= 40 && getRegistroInfo.NO2 < 90,
                                'gases _3' : getRegistroInfo.NO2 >= 90 && getRegistroInfo.NO2 < 120,
                                'gases _4' : getRegistroInfo.NO2 >= 120 && getRegistroInfo.NO2 < 230,
                                'gases _5' : getRegistroInfo.NO2 >= 230 && getRegistroInfo.NO2 < 340,
                                'gases _6' : getRegistroInfo.NO2 >= 340
                            }"
            > 
                NO2 
                <button class="gasesMedicion">
                    ?
                    <GasesMedicion class="medicion NO2" :info="'NO2'" />
                </button>
            </td>
            <td v-if="getRegistroInfo.O3 != 0 && getRegistroInfo.O3 != 1"
                :class = "{
                                'gases _1' : getRegistroInfo.O3 < 50, 
                                'gases _2' : getRegistroInfo.O3 >= 50 && getRegistroInfo.O3 < 100,
                                'gases _3' : getRegistroInfo.O3 >= 100 && getRegistroInfo.O3 < 130,
                                'gases _4' : getRegistroInfo.O3 >= 130 && getRegistroInfo.O3 < 240,
                                'gases _5' : getRegistroInfo.O3 >= 240 && getRegistroInfo.O3 < 380,
                                'gases _6' : getRegistroInfo.O3 >= 380
                            }"
            >
                O3 
                <button class="gasesMedicion">
                    ? 
                    <GasesMedicion class="medicion O3" :info="'O3'" />
                </button> 
            </td>
            <td v-if="getRegistroInfo.SO2 != 0 && getRegistroInfo.SO2 != 1"
                :class = "{
                                'gases _1' : getRegistroInfo.SO2 < 40, 
                                'gases _2' : getRegistroInfo.SO2 >= 40 && getRegistroInfo.SO2 < 90,
                                'gases _3' : getRegistroInfo.SO2 >= 90 && getRegistroInfo.SO2 < 120,
                                'gases _4' : getRegistroInfo.SO2 >= 120 && getRegistroInfo.SO2 < 230,
                                'gases _5' : getRegistroInfo.SO2 >= 230 && getRegistroInfo.SO2 < 340,
                                'gases _6' : getRegistroInfo.SO2 >= 340
                            }"
            > 
                SO2 
                <button class="gasesMedicion">
                    ?
                    <GasesMedicion class="medicion SO2" :info="'SO2'" />
                </button> 
            </td>
        </tr>
        <tr>
            <td v-if="getRegistroInfo.CO != 0 && getRegistroInfo.CO != 1"> {{ getRegistroInfo.CO }}</td>
            <td v-if="getRegistroInfo.NO2 != 0 && getRegistroInfo.NO2 != 1"> {{ getRegistroInfo.NO2 }}</td>
            <td v-if="getRegistroInfo.O3 != 0 && getRegistroInfo.O3 != 1"> {{ getRegistroInfo.O3 }}</td>
            <td v-if="getRegistroInfo.SO2 != 0 && getRegistroInfo.SO2 != 1"> {{ getRegistroInfo.SO2 }}</td>
        </tr>
    </table>

  </div>

  <div v-if="getElementInfoID == 2 && getRegistroInfo" class="containerIncidenciasInfo">
    <div>
        <p>
            <strong> 
                <div v-if="getIdioma === Idiomas.ES">
                    {{ Nombre_es }}
                </div>
                <div v-else-if="getIdioma === Idiomas.EN">
                    {{ Nombre_en }}
                </div>
             </strong>
        </p>
        <p>
            <strong> {{ $t('ElementInfo.fecha') }}: </strong>
            {{ getRegistroInfo.Fecha }}
        </p>
        <p>
            <strong> {{ $t('ElementInfo.tipo') }}: </strong>
            <span v-if="getIdioma === Idiomas.ES">
                {{ getTypeIncidence[getRegistroInfo.Tipo].name_es }}
            </span>
            <span v-else-if="getIdioma === Idiomas.EN">
                {{ getTypeIncidence[getRegistroInfo.Tipo].name_en }}
            </span>
        </p>
    </div>

    <div class="image-container">
        <img :src="`data:${getRegistroInfo.Imagen.contentType};base64,${Buffer.from(getRegistroInfo.Imagen.data.data).toString('base64')}`" alt="Imagen" class="img-fluid d-block aumentarImagen" />
    </div>

    <p v-if="Descripcion_es && Descripcion_en">
        <strong> {{ $t('ElementInfo.descripcion') }}: </strong><br>
        <span v-if="getIdioma === Idiomas.ES">
            {{ Descripcion_es }}
        </span>
        <span v-else-if="getIdioma === Idiomas.EN">
            {{ Descripcion_en }}
        </span>
    </p>

    <button v-if="getAdmin" id="editRegistro" class="btn btn-success"> {{ $t('ElementInfo.modIncidencia') }} </button>

  </div>

  <div v-if="getElementInfoID == 3 && getRegistroInfo" class="containerAlarmasInfo">

    <p class="">
        <strong> {{ $t('ElementInfo.nombre') }}: </strong>
        {{ getRegistroInfo.Nombre }}
    </p>
    <p>
        <strong> {{ $t('ElementInfo.rango') }}: </strong>
        {{ getRegistroInfo.Rango }}
    </p>

    <button v-if="getRegistroInfo.Activada" class="btn btn-warning" @click="resetAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.resAlarma') }} </button>

    <button v-if="getRegistroInfo.Activada" class="btn btn-danger" @click="deleteAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.borrAlarma') }} </button>

    <input v-if="!getRegistroInfo.Activada" class="btn btn-danger" type="button" value="Borrar Alarma" @click="deleteAlarma(getRegistroInfo._id)">

  </div>
</template>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    .containerCalidadAireInfo{
        margin-top: 3%;
        display: grid;
        grid-template-columns: 50% 50%;
        white-space: nowrap;

        display: flex;
        flex-direction: column;
        align-items: center;

        h6{
            grid-column: 1/3;
        }
    }

    .tablaCalidadAireInfo{
        width: 100%;
        margin-bottom: 20px;
        
        th, td {
            align-self: center;
            justify-content: center;

            background-color: white;
            border:1px solid $secondary-color;

            padding: 1px 12px 1px 12px;
        }

        th {
            
            color: $primary-color;
        }
    }

    .CO{
        &._1{
            background-color: #00e600;
        }
        &._2{
            background-color: #ebeb36;
        }
        &._3{
            background-color: #ff9b00;
        }
        &._4{
            background-color: #ff0000;
        }
        &._5{
            background-color: #7d0023;
        }
    }

    .gases{
        &._1{
            background-color: #00efe6;
        }
        &._2{
            background-color: #00edaa;
        }
        &._3{
            background-color: #ebeb36;
        }
        &._4{
            background-color: #ff5751;
        }
        &._5{
            background-color: #ad0531;
        }
        &._6{
            background-color: #941283;
        }
    }

    .gasesMedicion{
        background-color: transparent;
        width: 18px;
        height: 18px;
        border-radius: 50%; 
        color: grey; 
        text-align: center; 
        line-height: 10px;
        padding: 0 1px 0 1px;
        font-size: 12px; 
        cursor: pointer;
        border: 1px solid grey;
    }

    .gasesMedicion:hover {
        background-color: rgba(grey, 0.5);

        .medicion{
            display: block;
        }
    }


    .medicion{
        position: absolute;
        display: none;
        z-index: 1004;
        background-color: $light-color;
        border-radius: 20px;
        padding: 15px;

        &.CO{
            top: 27%;
            left: 5%;   
        }

        &.NO2{
            top: 22%;
            left: 25%;
        }

        &.O3{
            top: 22%;
            left: 41%;
        }

        &.SO2{
            top: 22%;
            left: 57%;
        }
        
    }

    .containerIncidenciasInfo{
        margin-top: 3%;
        display: grid;
        grid-template-columns: 50% 50%;

        p, button {
            grid-column: 1/3;
        }

        button {
            margin: 0px 50px 9px 50px;
        }
    }

    .containerAlarmasInfo{
        margin-top: 3%;
        display: grid;
        width: 100%;
        grid-template-columns: 50% 50%;
        white-space: nowrap;

        input{
            grid-column: 1/3;
            margin: 0 20% 0 20% ;
        }

        button{
            margin: 0 10% 5% 10% ;
        }
    }

    .image-container{
        width: 200px; /* Ancho de la caja en píxeles */
        height: 200px; /* Alto de la caja en píxeles */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .aumentarImagen:hover{
        transform: scale(2.5)
    }

    .aumentarImagen{
        transition: transform 1s;
        z-index: 1000;
    }
</style>
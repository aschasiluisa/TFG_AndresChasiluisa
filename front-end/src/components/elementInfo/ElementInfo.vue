<script lang="ts" src="./ElementInfo.ts"></script>

<template>
  <div v-if="getElementInfoID == 1 && getRegistroInfo" class="containerCalidadAireInfo">

    <h6 style="margin-bottom: 15px;">
        {{ $t('ElementInfo.estacion') }} {{ getRegistroInfo.Nombre }}
    </h6>

    <button v-show="userAuthenticated" type="button" class="historial-download" @click="historialRegistroCalidadAire"></button>

    <table class="tablaElementoInfo">
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

    <table class="tablaElementoInfo">
        <tr>
            <th colspan="4"> {{ $t('ElementInfo.medicionesTitulo') }} </th>
        </tr>
        <tr>
            <td id="RegistroCO" v-if="getRegistroInfo.CO != 0 && getRegistroInfo.CO != 1" 
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
                    <GasesMedicion class="medicion" :info="'CO'" id="GasCO"/>
                </button> 
            </td>
            <td id="RegistroNO2" v-if="getRegistroInfo.NO2 != 0 && getRegistroInfo.NO2 != 1"
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
                    <GasesMedicion class="medicion" :info="'NO2'" />
                </button>
            </td>
            <td id="RegistroO3" v-if="getRegistroInfo.O3 != 0 && getRegistroInfo.O3 != 1"
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
                    <GasesMedicion class="medicion" :info="'O3'" />
                </button> 
            </td>
            <td id="RegistroSO2" v-if="getRegistroInfo.SO2 != 0 && getRegistroInfo.SO2 != 1"
                :class = "{
                                'gases _1' : getRegistroInfo.SO2 < 100, 
                                'gases _2' : getRegistroInfo.SO2 >= 100 && getRegistroInfo.SO2 < 200,
                                'gases _3' : getRegistroInfo.SO2 >= 200 && getRegistroInfo.SO2 < 350,
                                'gases _4' : getRegistroInfo.SO2 >= 350 && getRegistroInfo.SO2 < 500,
                                'gases _5' : getRegistroInfo.SO2 >= 500 && getRegistroInfo.SO2 < 750,
                                'gases _6' : getRegistroInfo.SO2 >= 750
                            }"
            > 
                SO2 
                <button class="gasesMedicion">
                    ?
                    <GasesMedicion class="medicion" :info="'SO2'" />
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

    <table class="tablaElementoInfo">
        <tr>
            <td colspan="2">
                <strong v-if="getIdioma === Idiomas.ES">
                    {{ Nombre_es }}
                </strong>
                <strong v-else-if="getIdioma === Idiomas.EN">
                    {{ Nombre_en }}
                </strong>
            </td>
            <td rowspan="3">
                <div class="image-container">
                    <img :src="`data:${getRegistroInfo.Imagen.contentType};base64,${Buffer.from(getRegistroInfo.Imagen.data.data).toString('base64')}`" alt="Imagen" class="img-fluid d-block aumentarImagen" />
                </div>
            </td>
        </tr>
        <tr>
            <th>
                {{ $t('ElementInfo.fecha') }}
            </th>
            <td>
                {{ getRegistroInfo.Fecha }}
            </td>
        </tr>
        <tr>
            <th>
                {{ $t('ElementInfo.tipo') }}
            </th>
            <td>
                <span v-if="getIdioma === Idiomas.ES">
                    {{ getTypeIncidence[getRegistroInfo.Tipo].name_es }}
                </span>
                <span v-else-if="getIdioma === Idiomas.EN">
                    {{ getTypeIncidence[getRegistroInfo.Tipo].name_en }}
                </span>
            </td>
        </tr>
        <tr v-if="Descripcion_es && Descripcion_en">
            <th colspan="3">
                {{ $t('ElementInfo.descripcion') }}
            </th>
        </tr>
        <tr v-if="Descripcion_es && Descripcion_en">
            <td colspan="3">
                <span v-if="getIdioma === Idiomas.ES">
                    {{ Descripcion_es }}
                </span>
                <span v-else-if="getIdioma === Idiomas.EN">
                    {{ Descripcion_en }}
                </span>
            </td>
        </tr>
    </table>

    <button v-if="getAdmin" id="editRegistro" class="btn btn-success" > {{ $t('ElementInfo.modIncidencia') }} </button>

  </div>

  <div v-if="getElementInfoID == 3 && getRegistroInfo" class="containerAlarmasInfo">

    <p>
        <strong> {{ $t('ElementInfo.nombre') }}: </strong>
        {{ getRegistroInfo.Nombre }}
    </p>
    <p>
        <strong> {{ $t('ElementInfo.rango') }}: </strong>
        {{ getRegistroInfo.Rango }}
    </p>

    <button v-if="getRegistroInfo.Activada" class="btn btn-warning" style="width: 75%; justify-self: center;" @click="resetAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.resAlarma') }} </button>

    <button v-if="getRegistroInfo.Activada" class="btn btn-danger" style="width: 75%; justify-self: center;" @click="deleteAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.borrAlarma') }} </button>

    <input v-if="!getRegistroInfo.Activada" class="btn btn-danger" type="button" value="Borrar Alarma" style="margin-bottom: 15px; width: 45%; justify-self: center;" @click="deleteAlarma(getRegistroInfo._id)">

  </div>

  <div v-if="getElementInfoID == 4" class="containerAlarmasInfo">
    <div v-for="sublayer in sublayers_4" :key="sublayer.id" class="capasInfraestructura">
        <span class="subcapa">
            <input type="checkbox" :id="sublayer.name_es"  v-model="sublayersControl_4[sublayer.id]" style="cursor: pointer;"/>
            <label :for="sublayer.name_es">
                <div v-if="getIdioma === Idiomas.ES">
                    {{ sublayer.name_es }} 
                </div>
                <div v-else-if="getIdioma === Idiomas.EN">
                    {{ sublayer.name_en }}
                </div>
            </label>
        </span>
    </div>
  </div>

  <div v-if="getElementInfoID == 5" class="containerAlarmasInfo">
    <div v-for="sublayer in sublayers_5" :key="sublayer.id" class="capasInfraestructura">
        <span class="subcapa">
            <input type="checkbox" :id="sublayer.name_es"  v-model="sublayersControl_5[sublayer.id]" />
            <label :for="sublayer.name_es">
                <div v-if="getIdioma === Idiomas.ES">
                    {{ sublayer.name_es }} 
                </div>
                <div v-else-if="getIdioma === Idiomas.EN">
                    {{ sublayer.name_en }}
                </div>
            </label>
            <span v-if="sublayer.id == 3">
                <select id="periodo" v-model="periodo_">
                    <option :value="periodos._3">{{ $t('ElementInfo.periodos._3') }}</option>
                    <option :value="periodos._15">{{ $t('ElementInfo.periodos._15') }}</option>
                    <option :value="periodos._90">{{ $t('ElementInfo.periodos._90') }}</option>
                </select>
                <button :style="{ background: mapaCalor_activada? 'linear-gradient(to right, red, yellow)' : 'linear-gradient(to right, blue, purple)', color: mapaCalor_activada ? 'black' : 'white' }" 
                @click="changeMapaCalor_activada">
                    {{ $t('ElementInfo.mapaCalor') }}
                </button>
            </span>
        </span>
    </div>
  </div>

</template>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    .containerCalidadAireInfo{
        margin-top: 3%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .historial-download{
        position: absolute;
        top: 10px;
        right: 5px;
        width: 8px;
        height: 8px;
        padding: 15px;
        background: url(../../../public/imagenes/cloud-download.png);
        background-position: center;
        background-size: contain;
        background-color: white;
        z-index: 1000;
        cursor: pointer;
        border: none;
    }

    .tablaElementoInfo{
        width: 100%;
        margin-bottom: 20px;
        
        th, td {
            align-self: center;
            justify-content: center;
            white-space: nowrap;

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

    .gasesMedicion {
        position: relative;
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

    .image-container{
        width: 125px; /* Ancho de la caja en píxeles */
        height: 125px; /* Alto de la caja en píxeles */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .aumentarImagen{
        transition: transform 1s;
        z-index: 1000;
    }

    .aumentarImagen:hover{
        transform: scale(2.5)
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

    .capasInfraestructura{
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;

    }

    .subcapa{
        input, label {
            cursor: pointer;
        }
        margin-bottom: 7px;

        select{
            appearance: none;
            padding: 2px; 
            background-color: white; 
            border: 1px solid #ccc; 
            border-radius: 5px; 
            margin-left: 7px;
        }

        button{
            border: 1px solid #ccc; 
            padding: 3px 16px 4px 16px;
            border-radius: 5px;
            border: none;
        }
    }

</style>
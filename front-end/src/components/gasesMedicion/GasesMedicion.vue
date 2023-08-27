<script lang="ts" src="./gasesMedicion.ts"></script>

<template>
    <span>
        <div v-if="info == 'CO'">
            <div class="legend-item-CO">
                <div class="square-color" style="background:#00e600"></div>
                <span style="text-align: left;"> &lt; 500 : Buena </span>
            </div>
            <div class="legend-item-CO">
                <div class="square-color" style="background:#ebeb36"></div>
                <span style="text-align: left;"> 500 - 1000 : Razonablemente buena </span>
            </div>
            <div class="legend-item-CO">
                <div class="square-color" style="background:#ff9b00"></div>
                <span style="text-align: left;"> 1000 - 1500 : Regular </span>
            </div>
            <div class="legend-item-CO">
                <div class="square-color" style="background:#ff0000"></div>
                <span style="text-align: left;"> 1500 - 2000 : Desfavorable </span>
            </div>
            <div class="legend-item-CO">
                <div class="square-color" style="background:#7d0023"></div>
                <span style="text-align: left;"> > 2000 : Muy desfavorable </span>
            </div>
        </div>

        <div v-if="info == 'NO2'">
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00efe6"></div>
                <span style="text-align: left;"> &lt; 40 : Muy buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00edaa"></div>
                <span style="text-align: left;"> 40 - 90 : Buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ebeb36"></div>
                <span style="text-align: left;"> 90 - 120 : Regular </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ff5751"></div>
                <span style="text-align: left;"> 120 - 230 : Desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ad0531"></div>
                <span style="text-align: left;"> 230 - 340 : Muy desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#941283"></div>
                <span style="text-align: left;"> > 340 : Alarmante </span>
            </div>
        </div>

        <div v-if="info == 'O3'">
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00efe6"></div>
                <span style="text-align: left;"> &lt; 50 : Muy buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00edaa"></div>
                <span style="text-align: left;">50 - 100 : Buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ebeb36"></div>
                <span style="text-align: left;"> 100 - 130 : Regular </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ff5751"></div>
                <span style="text-align: left;"> 130 - 240 : Desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ad0531"></div>
                <span style="text-align: left;"> 240 - 380 : Muy desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#941283"></div>
                <span style="text-align: left;"> > 380 : Alarmante </span>
            </div>
        </div>

        <div v-if="info == 'SO2'">
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00efe6"></div>
                <span style="text-align: left;"> &lt; 100 : Muy buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#00edaa"></div>
                <span style="text-align: left;"> 100 - 200 : Buena </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ebeb36"></div>
                <span style="text-align: left;"> 200 - 350 : Regular </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ff5751"></div>
                <span style="text-align: left;"> 350 - 500 : Desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#ad0531"></div>
                <span style="text-align: left;"> 500 - 750 : Muy desfavorable </span>
            </div>
            <div class="legend-item-gases">
                <div class="square-color" style="background:#941283"></div>
                <span style="text-align: left;"> > 750 : Alarmante </span>
            </div>
        </div>

    </span>
</template>

<style lang="scss" scoped>

@import "@/css/globalStyles.scss";

.square-color{
    white-space: nowrap;
    width: 12px;
    height: 12px;
    grid-column: 1;
}

.legend-item-CO{
    display: grid;
    grid-template-columns: 6% 91%;
    grid-column-gap: 3%;
    white-space: nowrap;
}

.legend-item-gases{
    display: grid;
    grid-template-columns: 6% 88%;
    grid-column-gap: 6%;
    white-space: nowrap;
}

</style>
import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default class Chart extends Component {
  render() {
    return (
        <ResponsiveBar
        data = {[
            {
              "country": "AD",
              "hot dog": 60,
              "hot dogColor": "hsl(354, 70%, 50%)",
              "burger": 184,
              "burgerColor": "hsl(236, 70%, 50%)",
              "sandwich": 90,
              "sandwichColor": "hsl(3, 70%, 50%)",
              "kebab": 113,
              "kebabColor": "hsl(81, 70%, 50%)",
              "fries": 154,
              "friesColor": "hsl(8, 70%, 50%)",
              "donut": 134,
              "donutColor": "hsl(356, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 146,
              "hot dogColor": "hsl(79, 70%, 50%)",
              "burger": 77,
              "burgerColor": "hsl(15, 70%, 50%)",
              "sandwich": 73,
              "sandwichColor": "hsl(261, 70%, 50%)",
              "kebab": 173,
              "kebabColor": "hsl(132, 70%, 50%)",
              "fries": 63,
              "friesColor": "hsl(343, 70%, 50%)",
              "donut": 131,
              "donutColor": "hsl(303, 70%, 50%)"
            }]}
        keys={[
            "hot dog",
            "burger",
            "sandwich",
            "kebab",
            "fries",
            "donut"
        ]}
        indexBy="country"
        margin={{
            "top": 50,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        layout="horizontal"
        colors="nivo"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "fries"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "sandwich"
                },
                "id": "lines"
            }
        ]}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "country",
            "legendPosition": "middle",
            "legendOffset": 32
        }}
        axisLeft={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "food",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
    )
  }
}

---
title: "Spring Boot Scripting Language Runner :airplane_departure:"
draft: true
date: 2024-05-22
description: "Spring Boot experiment to run scripting language"
summary: "Run Javascript, Groovy, and Python from Spring Boot"
slug: "spring-boot-scripting-language-runner"
tags: ["java", "scripting", "CaaC"]
---
## Preface

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

## Hardware Specification

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

## Testing Methodology

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

### Javascript

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

### Groovy

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

### Python

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

## Testing Result


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 

{{< chart >}}
type: 'line',
data: {
    labels: [
        1, 2, 3, 4,  5,
        6, 7, 8, 9, 10
    ],
    datasets: [
        {
            label: 'Javascript timecost (ms)',
            data: [ 
                1551, 28, 22, 22,
                25, 25, 21, 20,
                17, 16
            ],
            tension: 0.4
        },
        {
            label: 'Groovy timecost (ms)',
            backgroundColor : '#36A2EB',
            borderColor: '#36A2EB',
            data: [ 
                641, 23, 27, 26, 23,
                30, 28, 23, 25, 25
            ],
            tension: 0.4
        }, 
    ],
},
options: {
    responsive: true,
plugins: {
      title: {
        display: true,
        text: 'Timecost for the first 10 request'
      },
    },
}
{{< /chart >}}


{{< chart >}}
type: 'line',
data: {
    labels: [
        1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
        13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
        49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
        73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
        85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
        97, 98, 99, 100
    ],
    datasets: [
        {
            label: 'Javascript timecost (ms)',
            data: [ 
                11, 13, 11, 16, 13,  9, 10, 12, 11, 12,  8,  9,
                11, 11,  9, 10, 10, 11,  9,  9,  8,  8,  9,  9,
                8,  7,  9,  9,  8,  9,  7,  8, 12,  6,  9, 10,
                9,  7,  7,  8,  6,  8,  7, 10,  9,  8,  7,  9,
                10,  8,  7,  8,  9, 10,  6,  7,  4,  7, 13,  7,
                8,  6, 10, 10, 12, 10, 10,  9, 11,  9,  8,  7,
                7,  6,  6,  9,  6,  6,  6,  7,  8,  8,  9, 10,
                7,  8,  9,  7,  7,  7,  9,  8,  8,  9,  7,  7,
                10, 10,  8,  9
            ],
            tension: 0.4
        },
        {
            label: 'Groovy timecost (ms)',
            backgroundColor : '#36A2EB',
            borderColor: '#36A2EB',
            data: [ 
                16, 16, 19, 22, 30, 20, 20, 18, 20, 20, 23, 22,
                20, 18, 13, 16, 16, 16, 19, 22, 17, 21, 17, 23,
                31, 18, 16, 16, 19, 17, 15, 14, 17, 17, 16, 17,
                17, 20, 20, 18, 16, 18, 20, 23, 17, 20, 17, 16,
                16, 18, 15, 15, 14, 56, 18, 23, 20, 22, 21, 16,
                14, 20, 18, 19, 22, 19, 19, 20, 17, 16, 15, 14,
                17, 13, 16, 18, 27, 24, 17, 17, 16, 16, 15, 24,
                20, 17, 15, 16, 19, 14, 18, 16, 17, 16, 20, 19,
                18, 16, 18, 18
            ],
            tension: 0.4
        }
    ],
},
options: {
    responsive: true,
plugins: {
      title: {
        display: true,
        text: 'Timecost for next 100 request'
      },
    },
}
{{< /chart >}}

## Conclusions

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada enim malesuada, rhoncus nunc non, rhoncus justo. Ut id vestibulum enim, eu condimentum urna. Morbi sed nisl mauris. Cras lobortis libero vel ante placerat, vel congue risus iaculis. Suspendisse potenti. Donec sed orci lobortis, posuere massa eu, suscipit quam. Nunc non mollis enim, dignissim cursus est. Mauris in eleifend enim, faucibus tempor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
---
title: "Spring Boot Scripting Language Runner :airplane_departure:"
date: 2024-05-22
description: "Spring Boot experiment to run scripting language"
summary: "Run Javascript, Groovy, and Python from Spring Boot"
slug: "spring-boot-scripting-language-runner"
tags: ["java", "scripting", "CaC"]
---

# 🛫 Spring Boot Scripting Language Runner

Welcome, fellow code explorer! 🚀 In this post, I’m diving into a fun experiment: running scripting languages (JavaScript, Groovy, and Python) directly from Spring Boot. Why? Because sometimes config files just aren’t enough—you want real code as config!

---

## 🧩 Code as Config

Modern software often needs configs that can be changed on the fly to tweak behavior. Enter "Config as Code" (CaC):

- Store config in version control (like Git)
- Track and audit changes just like source code
- Make your app more dynamic and flexible

**Example: Spring Boot `application.yml`**
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

myapp:
  feature:
    enable: true
  service:
    timeout: 5000

```

But what if you need your config to *act* like code? Maybe you want:
- Reusability
- On-the-fly changes
- Arithmetic, string manipulation, selection, repetition

---

## 🧙 Scripting Language as Config

For this experiment, I picked three scripting languages: `JavaScript`, `Groovy`, and `Python`. No deep reason—just wanted to see how each stacks up!

---

## 🧪 Testing Methodology

I used Spring Boot as the host, with three endpoints for each language. Each runner does simple tasks: selection, string manipulation, repetition, and JSON work. Here’s a peek at the controller:

**RunnerController.java**
```java
@Controller
public class RunnerController {

    private final GroovyRunner groovyRunner;

    private final JavascriptRunner javascriptRunner;

    private final PythonRunner pythonRunner;


    public RunnerController(GroovyRunner groovyRunner, 
                            JavascriptRunner javascriptRunner, 
                            PythonRunner pythonRunner) {
        this.groovyRunner = groovyRunner;
        this.javascriptRunner = javascriptRunner;
        this.pythonRunner = pythonRunner;
    }

    @PostMapping(value = "/groovy")
    public ResponseEntity<JSONObject> groovy(@RequestBody JSONObject request) {
        JSONObject response = groovyRunner.run(request);
        System.out.println(response.toJSONString());
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping(value = "/javascript")
    public ResponseEntity<JSONObject> javascript(@RequestBody JSONObject request) {
        JSONObject response = javascriptRunner.run(request);
        System.out.println(response.toJSONString());
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping(value = "/python")
    public ResponseEntity<JSONObject> python(@RequestBody JSONObject request) {
        JSONObject response = pythonRunner.run(request);
        System.out.println(response.toJSONString());
        return ResponseEntity.status(200).body(response);
    }

}
```

Each of the runner will perform simple task which consists of selection, string manipulation, repetition, and JSON manipulation

### 🖥️ My Test Rig

For the curious, here’s my setup:

| Component | Specification |
|---|---|
| `OS` | Windows 11 Home Single Language |
|`Processor`| Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz (12 CPUs)|
|`Memory`|16 GB DDR4-2666 SDRAM (2 x 8 GB)|
|`Storage`|512 GB PCIe® NVMe™ M.2 SSD|
|`Spring Boot`|v3.2.5|
|`Java`|21.0.1|

---

### Javascript

To run JavaScript from Spring Boot, I used GraalVM and the following dependencies:

**pom.xml**
```xml
<!-- Graalvm -->
<dependency>
    <groupId>org.graalvm.polyglot</groupId>
    <artifactId>polyglot</artifactId>
    <version>24.0.0</version>
</dependency>

<dependency>
    <groupId>org.graalvm.polyglot</groupId>
    <artifactId>js</artifactId>
    <version>24.0.0</version>
    <type>pom</type>
</dependency>

<dependency>
    <groupId>org.graalvm.polyglot</groupId>
    <artifactId>tools</artifactId>
    <version>24.0.0</version>
    <type>pom</type>
</dependency>
```

In my case, the scripting language is available in the code as `script.js`. For other needs, this maybe stored in seperate database or other storage. 

**JavascriptRunner.java**
```java
@Service
public class JavascriptRunner implements Runner {

    private final FileService fileService;

    public JavascriptRunner(FileService fileService) {
        this.fileService = fileService;
    }

    public JSONObject run(JSONObject input) {
        long startTime = System.currentTimeMillis();

        String content = fileService.getContentFromFile("/runner/javascript/script.js");
        JSONObject resultJson = new JSONObject();
        // Initialize context
        try (Context context = Context.create("js")) {
            // Set the binding
            context.getBindings("js").putMember("message", input.toJSONString());

            Value result = context.eval("js", content);
            resultJson = JSON.parseObject(result.asString());
            return resultJson;
        } finally {
            // endTime set when the result is parsed and returned
            long endTime = System.currentTimeMillis();
            resultJson.put("timecost", (endTime - startTime));
        }
    }
}
```

The timecost is measured internally when the method `run` is called and stopped when the `Runner` is able to complete the task. This timecost then appended to the result that will be used as data source for the plot.

**script.js**
```javascript
function main(input) {
    let obj = JSON.parse(input);

    // if logic
    if (obj.age < 18) {
        obj.drink = false;
    } else {
        obj.drink = true;
    }

    // string manipulation
    obj.name = capitalizeFirstLetterOfEachWord(obj.name);

    // JSON manipulation
    let fullAddress = obj.addressDetail.street + " - House No " + obj.addressDetail.houseNo + " - Postal Code " + obj.addressDetail.postalCode;
    obj.additionalInfo = {
        fullAddress,
        job: obj.job
    }
    delete obj.job;
    delete obj.addressDetail;

    // putting null value
    obj.null = null;
    return JSON.stringify(obj);
}

function capitalizeFirstLetterOfEachWord(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

main(message);
```




### Groovy

For Groovy, here’s the dependency:

**pom.xml**
```xml
<!-- Groovy -->
<dependency>
    <groupId>org.codehaus.groovy</groupId>
    <artifactId>groovy-all</artifactId>
    <version>3.0.17</version>
</dependency>
```

The `Runner` looks like this

**GroovyRunner.java**
```java
@Service
public class GroovyRunner implements Runner {

    private final FileService fileService;

    public GroovyRunner (FileService fileService) {
        this.fileService = fileService;
    }

    public JSONObject run(JSONObject input) {
        long startTime = System.currentTimeMillis();
        String content = fileService.getContentFromFile("/runner/groovy/script.groovy");

        // Initialize the GroovyShell and set the binding
        Binding binding = new Binding();
        binding.setVariable("message", input.toJSONString());
        GroovyShell shell = new GroovyShell(binding);

        // Execute the script
        Object result = shell.evaluate(content);
        JSONObject resultJson = JSON.parseObject(result.toString());

        // endTime set where JSON is parsed
        long endTime = System.currentTimeMillis();

        resultJson.put("timecost", (endTime - startTime));
        return resultJson;
    }


}
```

**script.groovy**
```groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

def main(String input) {
    def jsonSlurper = new JsonSlurper()
    def obj = jsonSlurper.parseText(input)

    // if logic
    if (obj['age'] < 18) {
        obj['drink'] = false
    } else {
        obj['drink'] = true
    }

    // string manipulation
    obj['name'] = capitalizeFirstLetterOfEachWord(obj.name)

    // JSON manipulation
    def fullAddress = "${obj['addressDetail']['street']} - House No ${obj['addressDetail']['houseNo']} - Postal Code ${obj['addressDetail']['postalCode']}"
    obj['additionalInfo'] = [
            fullAddress: fullAddress,
            job: obj['job']
    ]
    obj.remove('job')
    obj.remove('addressDetail')

    // putting null value
    obj['null'] = null

    return JsonOutput.toJson(obj)
}

def capitalizeFirstLetterOfEachWord(String str) {
    return str.split(' ').collect { word ->
        word[0].toUpperCase() + word[1..-1].toLowerCase()
    }.join(' ')
}

return main(message)
```

### Python

For Python, I used GraalVM’s `python-community` dependency:

**pom.xml**
```xml
<dependency>
    <groupId>org.graalvm.polyglot</groupId>
    <artifactId>python-community</artifactId>
    <version>24.0.0</version>
    <type>pom</type>
</dependency>
```

The `Runner` looks similar with `Javascript` version with a little bit of adjustment

**PythonRunner.java**
```java
@Service
public class PythonRunner implements Runner {

    private final FileService fileService;

    public PythonRunner(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public JSONObject run(JSONObject input) {
        long startTime = System.currentTimeMillis();

        String content = fileService.getContentFromFile("/runner/python/script.py");
        JSONObject resultJson = new JSONObject();
        try (Context context = Context.create("python")) {
            // Set the binding
            context.getBindings("python").putMember("message", input.toJSONString());

            Value result = context.eval("python", content);
            resultJson = JSON.parseObject(result.asString());
            return resultJson;
        } finally {
            // endTime set when the result is parsed and returned
            long endTime = System.currentTimeMillis();
            resultJson.put("timecost", (endTime - startTime));
        }
    }
}
```

**script.py**
```python
import json

def capitalize_first_letter_of_each_word(s):
    return ' '.join(word.capitalize() for word in s.split(' '))

def main(input):
    obj = json.loads(input)

    # if logic
    if obj['age'] < 18:
        obj['drink'] = False
    else:
        obj['drink'] = True

    # string manipulation
    obj['name'] = capitalize_first_letter_of_each_word(obj['name'])

    # JSON manipulation
    full_address = f"{obj['addressDetail']['street']} - House No {obj['addressDetail']['houseNo']} - Postal Code {obj['addressDetail']['postalCode']}"
    obj['additionalInfo'] = {
        'fullAddress': full_address,
        'job': obj['job']
    }
    del obj['job']
    del obj['addressDetail']

    # putting null value
    obj['null'] = None
    return json.dumps(obj)

main(message)
```



---

## 📊 Testing Result

After running the tests, here’s what I found:

- 🐍 **Python** was the slowest on the first request (`7156ms`), but improved over time.
- 🚀 **Groovy** was the fastest on the first run (`722ms`) and stayed quick.
- ⚡ **JavaScript** and **Groovy** were neck-and-neck for repeated requests (`30-40ms`).

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
            backgroundColor : '#FFFF00',
            borderColor: '#FFFF00',
            data: [ 
                1419, 22, 19, 18,
                    24, 41, 55, 34,
                    32, 31
            ],
            tension: 0.4
        },
        {
            label: 'Groovy timecost (ms)',
            backgroundColor : '#d946ef',
            borderColor: '#d946ef',
            data: [ 
                722, 44, 53, 46, 48,
                37, 35, 34, 39, 33
            ],
            tension: 0.4
        }, 
        {
            label: 'Python timecost (ms)',
            backgroundColor : '#36A2EB',
            borderColor: '#36A2EB',
            data: [ 
                7156, 742, 587,
                605, 558, 492,
                466, 485, 407,
                399
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
        text: 'Timecost for the first 10 requests'
      },
    },
    scales: {
        x: {
            display: false
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Timecost (ms)'
            },
            suggestedMax: 500
        }    
    }
}
{{< /chart >}}

For the next 50 requests:

- ⚡ **JavaScript** was the fastest (`~10ms`)
- 🚀 **Groovy** followed (`~20ms`)
- 🐍 **Python** stayed above `100ms`

{{< chart >}}
type: 'line',
data: {
    labels: [
        1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
        45, 46, 47, 48, 49, 50
    ],
    datasets: [
        {
            label: 'Javascript timecost (ms)',
            backgroundColor : '#FFFF00',
            borderColor: '#FFFF00',
            data: [ 
                13, 13, 13, 13, 15, 11, 13, 14, 13, 13, 16,
                20, 14, 18, 14, 13, 14, 13, 13, 13, 11, 13,
                17, 13, 13, 13, 13, 13, 12, 15, 11, 11, 13,
                13, 14, 13, 12, 12, 12, 10, 10, 11, 11, 11,
                10, 10, 11,  9, 13, 11
            ],
            tension: 0.4
        },
        {
            label: 'Groovy timecost (ms)',
            backgroundColor : '#d946ef',
            borderColor: '#d946ef',
            data: [ 
                20, 20, 19, 21, 24, 16, 15, 19, 18, 22, 19,
                21, 23, 19, 20, 16, 17, 19, 19, 18, 22, 21,
                22, 16, 16, 17, 19, 20, 22, 20, 26, 19, 20,
                19, 17, 16, 18, 20, 25, 22, 17, 52, 21, 20,
                24, 18, 22, 18, 18, 17
            ],
            tension: 0.4
        },
        {
            label: 'Python timecost (ms)',
            backgroundColor : '#36A2EB',
            borderColor: '#36A2EB',
            data: [ 
                216, 244, 236, 226, 223, 238, 241, 205,
                186, 251, 222, 257, 322, 323, 205, 206,
                206, 203, 207, 219, 190, 232, 176, 181,
                184, 214, 185, 197, 217, 187, 207, 191,
                205, 158, 165, 166, 153, 152, 164, 165,
                169, 163, 161, 168, 193, 147, 160, 156,
                156, 150
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
        text: 'Timecost for next 50 requests'
      },
    },
    scales: {
        x: {
            display: false
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Timecost (ms)'
            },
            suggestedMax: 200
        }    
    }
}
{{< /chart >}}

---

## 🏁 Conclusions

Here’s what I learned:

1. **Performance:**
    - `JavaScript` is the speed king for repeated requests.
    - `Groovy` is a solid, reliable choice.
    - `Python` lags behind, but still works if you need it.
2. **Use Case:**
    - Pick your scripting language based on your app’s needs. If you want speed and flexibility, JavaScript or Groovy are great picks.

Using scripting languages for config can make your app super flexible, but always keep performance in mind.

Full code is here: [spring-boot-script-runner](https://github.com/timothyjulian/spring-boot-script-runner) 🛠️
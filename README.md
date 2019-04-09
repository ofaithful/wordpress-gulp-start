# Starter template
Starting template for creating wordpress theme using gulp.

## Installation
Clone or download this repository to your theme folder and run:
```bash
    npm install
```


## Usage
After installing all the packages run following command from your theme folder:
```bash
    gulp
```


## Scss folder structure


#### Abstracs
Define your sass variables.


#### Base
General styles for elements using element selector:
```bash
    body, form {
        margin: 0;
        padding: 0;
    }
    
    a {
        color: #039;
    }
```

#### Components
Major page components, such as a header or footer.


#### Modules
Minor page components (navigation, form, buttons). Sits within components.


#### Pages
Specific page styles.


#### Vendor
Third party libraries. Use `_custom.scss` to reassign properties.

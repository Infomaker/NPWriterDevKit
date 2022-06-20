# PLUGIN_NAME

Description of the plugin

## Plugin configuration

```json
{
    "id": "${pluginId}",
    "name": "${pluginName}",
    "url": "https://PLUGIN_LOCATION_DOMAIN/${pluginName}/{PLUGIN_VERSION}/index.js",
    "style": "https://PLUGIN_LOCATION_DOMAIN/${pluginName}/{PLUGIN_VERSION}/style.css",
    "enabled": true,
    "mandatory": false,
    "data": {
        "exampleConfigurationProperty": "Hello World",
        "anotherOne": {
            "foo": "bar",
            "yes": true
        }
    }
}
```

| Property  | Type | Required | Description|
| :-------- | ---  | -------- | :--------- |
| `exampleConfigurationProperty`  | String  | `false` | Property description |
| `anotherOne`                    | Object  | `true`  | Property description |

### `anotherOne` configuration

This is an example of object configuration property description.

```json
{
  "foo": "bar",
  "yes": true
}
```

| Property  | Type | Required | Description|
| :-------- | ---  | -------- | :--------- |
| `foo`   | String  | `true`  | Property description |
| `yes`   | Boolean | `true`  | Property description |

## Output

Add information regarding format output (if any) of the plugin. Best described in combination with xml-snippet (see example below).

```xml
<newsItem>
    <itemMeta>
        <itemMetaExtProperty type="imext:mytype" value="x-im/xyz"/>
    </itemMeta>
</newsItem>
```

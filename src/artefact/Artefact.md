## Artefact architecture

```
/ui
  - map.json
  - UI.md
  /default
    - list.html
    - item.html
  /bootstrap
    /v2
      /views
        - list.html
        - item.html
      /css
        - list.css
        - item.css
      /icons
        - …
      /images
        - …
```

The `map.json` file will be used to identify a matching UI framework.

```json
{
  "bootstrap": {
    "site": "getbootstrap.com",
    "versions": {
      "default": {
        "status": "stable",
        "paths": {
          "main": "bootstrap/v1",
          "views": "bootstrap/v1/stable/views",
        },
        "dependencies": {
        }
      },
      "2": {
       "status": "beta",
       "path": "bootstrap/v2",
       "dependencies": {
         "jquery": "^2.1.0"
       }
      }
    }
  },
  "foundation": {
    "versions": {
      "default": {
        "path": "foundation/v5",
        "dependencies": {
        }
      }
    }
  }
}
```

The dependencies can list libraries that are required for each particular ui framework supported.
Note that the `status` entry will be used in the component configuration. 
If no status is given, it will be assumed to be "stable".

If we mount the contacts component in the `apps/user` application, 
the component will (by default?) be installed into the project file structure as follows:

`/contacts -> ./src/apps/user/contacts`

This can be configured per individual project layout via a custom `pipeline`.
# daypass-app

## Añadir fichero .nvmrc para la versión 20 de node

## El proyecto se compone de 3 ramas principales:<br>
main: Es la equivalente a PRO, es lo que se aplica al producto en producción.<br>
develop: Es la rama donde se suben los desarrollos listos para depurar.<br>
feature/nombre: Es la rama en la que trabaja cada técnico, desde la que se solicita el PORQUE a develop, cuando el código está terminado y listo para depurar.

# IMPORTANTE:
Antes de hacer un desarrollo, crea tu rama Feature/nombre y trabaja sobre tu rama hasta terminar.
Cada día sube tus cambios a tu rama, sin excepción, para tener siempre tu trabajo diario actualizado en tu rama.
Cuando subas un PR describe brevemente el funcionamiento (no técnico) que se está subiendo, para poder depurar.

## Conventional Commits:
### La estructura de un mensaje de commit siguiendo la especificación sería la siguiente:
- [scope opcional]: "descripción del commit"
- [cuerpo del mensaje, opcional]
- [footer(s), opcionales]

### Los tipos de commits son los siguientes:
> * **feat:** Una nueva característica o funcionalidad. Tendría correlación con una versión MINOR siguiendo SemVer.
> * **fix:** Un error corregido. Tendría correlación con una versión PATCH siguiendo SemVer.
> * **BREAKING CHANGE:** Un cambio que contenga esta palabra en el footer del mensaje **o un signo ! después del tipo o scope**, rompe la compatibilidad con versiones anteriores. Tendría correlación con una versión MAJOR siguiendo SemVer.
> * **build:** Cambios que afectan el sistema de compilación o dependencias externas (ej. cambios en el package.json).
> * **ci:** Cambios en nuestros archivos y scripts de configuración de integración continua.
> * **docs:** Cambios en la documentación.
> * **chore:** Otros cambios que no afectan el código fuente.
> * **perf:** Un cambio de código que mejora el rendimiento.
> * **refactor:** Un cambio de código que no corrige un error ni agrega una característica.
> * **style:** Cambios que no afectan el significado del código (espacios en blanco, formato, puntos y comas faltantes, etc).
> * **test:** Agregar pruebas faltantes o corregir pruebas existentes.

### Ejemplos:
> * Commit que añade una nueva característica, sin un scope en concreto.<br>
    **feat: add support for TypeScript**
> * Commit que arregla un bug, dentro del paquete ui de nuestro proyecto.<br>
    **fix(ui): bugfix on Button component**
> * Commit que rompe la compatibilidad con versiones anteriores, aunque no añade características nuevas ni corrige bugs.<br>
    **chore!: drop support for Node 6**<br>
    **BREAKING CHANGE: use JavaScript features not available in Node 6.**
> * Commit que agrega pruebas faltantes<br>
    **test(ui): add missing tests for Button component**
> * Commit con un mensaje descriptivo largo y varios footers o pie de página.<br>
    fix(api): prevent duplicate users from being created

This commit fixes a bug where the API would allow duplicate users to be created with the same email address. This commit also adds a new `unique` constraint to the `users` table to prevent this from happening in the future.

Paired with: X
Fixes #123**

# 🛡️ ANÁLISIS DE RIESGOS Y MEDIDAS DE SEGURIDAD (AR)
**Entidad:** Aplicaciones de pintura Colorprof S.L.

---

## 1. IDENTIFICACIÓN DE ACTIVOS Y AMENAZAS

### Activos Principales
* Base de datos de correos electrónicos y presupuestos (alojada en Don Dominio).
* Documentación laboral y fiscal (física y digital).
* Sitio web (Frontend en Vercel).

### Amenazas Detectadas
1.  **Acceso no autorizado al correo electrónico:** Riesgo de phishing o robo de credenciales en Don Dominio.
2.  **Pérdida de información:** Fallo en equipos locales o servidores.
3.  **Acceso indebido por personal interno/externo:** Visualización de datos confidenciales por trabajadores o desarrolladores externos sin autorización.
4.  **Intercepción de datos en la web:** Captura de datos de formularios.

---

## 2. EVALUACIÓN DEL RIESGO
Dado el volumen de datos (bajo/medio) y la tipología (datos básicos de contacto y facturación, sin datos sensibles a gran escala), el **Nivel de Riesgo se considera BAJO/MEDIO**.

---

## 3. MEDIDAS DE SEGURIDAD IMPLEMENTADAS Y PLANIFICADAS

Para mitigar los riesgos anteriores, se establecen las siguientes medidas técnicas y organizativas:

### A. Medidas Técnicas (Ciberseguridad)
1.  **Certificado SSL/TLS:** La web en **Vercel** utiliza protocolo seguro HTTPS para cifrar las comunicaciones del formulario.
2.  **Seguridad en el Correo (Don Dominio):**
    * Uso de contraseñas robustas (alfanuméricas).
    * *Planificada:* Activación de Autenticación de Doble Factor (2FA) en panel de control y webmail (si disponible).
3.  **Dispositivos y Antivirus:** Los equipos de la empresa cuentan con software antivirus actualizado y sistema operativo con licencias vigentes.
4.  **Copias de Seguridad:** Se realizan copias periódicas de la documentación crítica administrativa.

### B. Medidas Organizativas (Personas y Procesos)
1.  **Control de Accesos:**
    * **Trabajadores:** Solo acceden a los datos estrictamente necesarios para su función (ej. dirección de obra, contacto cliente).
    * **Desarrollador Web:** Acceso restringido y puntual para tareas de mantenimiento. No está autorizado a extraer bases de datos.
2.  **Compromiso de Confidencialidad:**
    * Se firma cláusula de confidencialidad con los **empleados** en sus contratos.
    * Se dispone de contrato de Encargado de Tratamiento (o cláusula equivalente) con la **Asesoría** y el **Desarrollador Web**, obligándoles a guardar secreto profesional.
3.  **Gestión de Papel:** La documentación en papel (facturas, contratos) se guarda en archivadores bajo llave o custodia en la oficina, no accesible a público general.

---

## 4. CONCLUSIÓN
Aplicando estas medidas, la organización considera que el riesgo residual es aceptable y garantiza la confidencialidad, integridad y disponibilidad de los datos personales.

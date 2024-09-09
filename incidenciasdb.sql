-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2024 a las 19:01:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `incidenciasdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentarios` int(11) NOT NULL,
  `id_incidencia` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `texto_comentario` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentarios`, `id_incidencia`, `id_usuario`, `texto_comentario`, `fecha_creacion`) VALUES
(1, 1, 1, 'prueba1', '2024-09-09 16:24:47'),
(2, 1, 1, 'prueba2', '2024-09-09 16:25:34'),
(3, 1, 1, 'prueba3', '2024-09-09 16:25:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id_incidencia` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `asunto` varchar(255) NOT NULL,
  `tipo` enum('fontanería','electricidad','limpieza','otros') NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` enum('pendiente','en progreso','resuelto') DEFAULT 'pendiente',
  `fecha_reporte` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id_incidencia`, `id_usuario`, `asunto`, `tipo`, `descripcion`, `imagen`, `estado`, `fecha_reporte`, `fecha_actualizacion`) VALUES
(1, 1, 'Fuga de agua en la cocina', 'fontanería', 'Se ha detectado una fuga de agua debajo del fregadero en la cocina. Necesito que un fontanero lo revise lo antes posible.', NULL, 'resuelto', '2024-09-03 05:00:00', '2024-09-09 15:52:35'),
(3, 1, 'Corte de electricidad en el salón', 'electricidad', 'El salón se ha quedado sin luz desde anoche. He revisado los fusibles, pero no he encontrado el problema.', NULL, 'en progreso', '2024-09-03 05:00:00', '2024-09-09 14:11:33'),
(4, 1, 'Cuarto mal creado', 'otros', 'asdasdsad', NULL, 'resuelto', '2024-09-05 05:00:00', '2024-09-09 14:11:40'),
(15, 1, 'Perrito se meo en mi puerta', 'limpieza', 'Perrito de la vecina se meo en mi puerta, propongo la castracion del perrito, adjunto la foto de del perrito', '1725554861068-25024.png', 'pendiente', '2024-09-05 05:00:00', '2024-09-05 16:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `rol` enum('residente','administrador') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `imagen`, `rol`) VALUES
(1, 'Carlos', 'Gómez', 'carlos.gomez@example.com', '$2b$10$sH52Hso5PPu5QlMPNafi7Obnq2KDo8urbmNXJq.T1nZdW26IMQVJm', 'Carlos', 'residente'),
(2, 'Lucía', 'Martínez', 'lucia.martinez@example.com', '$2b$10$p89rOltMqGhq.8G6U0AxM.y8sA12LNXMglA9K8AOD6FkfLrTwC8Wa', 'Lucía', 'administrador'),
(3, 'Kathy', 'Turpo', 'kathy.turpo@example.com', '$2b$10$G14bSrz2BlSucN9OKlhnh.T.XxYytOHTWCmXXhyQzDXiEc1VkMMyi', 'Kathy', 'residente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentarios`),
  ADD KEY `id_incidencia` (`id_incidencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_incidencia`) REFERENCES `incidencias` (`id_incidencia`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9
-- Dumped by pg_dump version 13.0

-- Started on 2022-11-29 23:14:49 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 635 (class 1247 OID 260232)
-- Name: enum_UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_UserRole" AS ENUM (
    'buyer',
    'seller'
);


ALTER TYPE public."enum_UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 259271)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 260241)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    "amountAvailable" integer DEFAULT 0 NOT NULL,
    cost integer NOT NULL,
    "productName" character varying(255) DEFAULT 0 NOT NULL,
    "sellerId" integer NOT NULL,
    CONSTRAINT "product_cost_amountAvailable_ck" CHECK ((((cost % 5) = 0) AND ((cost > 0) AND ("amountAvailable" >= 0)))),
    CONSTRAINT "product_productName_ck" CHECK ((("productName")::text ~ '^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$'::text))
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 260239)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 3286 (class 0 OID 0)
-- Dependencies: 203
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 202 (class 1259 OID 260219)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) DEFAULT 0 NOT NULL,
    deposit integer DEFAULT 0,
    role public."enum_UserRole" NOT NULL,
    "tokenValidFrom" bigint DEFAULT 0 NOT NULL,
    "lastTokenExpiry" bigint,
    CONSTRAINT user_deposit_ck CHECK ((((deposit % 5) = 0) AND (deposit >= 0))),
    CONSTRAINT user_username_ck CHECK (((username)::text ~ '^[a-zA-Z0-9]+([a-zA-Z0-9]+)*$'::text))
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 260217)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3287 (class 0 OID 0)
-- Dependencies: 201
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3137 (class 2604 OID 260244)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 3131 (class 2604 OID 260222)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3143 (class 2606 OID 259275)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3148 (class 2606 OID 260248)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- TOC entry 3146 (class 2606 OID 260229)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3149 (class 1259 OID 260254)
-- Name: product_seller_id_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_seller_id_ ON public.product USING btree ("sellerId", lower(("productName")::text));


--
-- TOC entry 3144 (class 1259 OID 260230)
-- Name: user_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_ ON public."user" USING btree (lower((username)::text));


--
-- TOC entry 3150 (class 2606 OID 260249)
-- Name: product product_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."user"(id) ON DELETE CASCADE;


-- Completed on 2022-11-29 23:14:49 CET

--
-- PostgreSQL database dump complete
--


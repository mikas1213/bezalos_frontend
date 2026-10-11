# Paprasčiausias `users` pavyzdys: tipai iš backendo į frontendą

## Kontekstas

Konfigūracija paruošta: Swagger CLI plugin'as, `openapi:generate` skriptas ir `operationIdFactory` → `Users_findAll`. Tačiau projekte dar nėra nė vieno tikro modulio, todėl neaišku, kaip tipai realiai keliauja į frontendą. Šiame plane sukursiu minimalų `users` modulį backende ir parodysiu, kaip tą patį `UserDto` frontendas gauna per orval.

Sąmoningai be duomenų bazės: duomenys laikomi masyve atmintyje, nes ORM dar nepasirinktas. Tikslas yra parodyti tipų kelią, o ne persistenciją.

## Backendas: nauji failai `src/users/`

Svarbu: Swagger plugin'as automatiškai nuskaito tik failus, kurių pavadinimas baigiasi `.dto.ts` arba `.entity.ts`. Todėl DTO failų pavadinimai turi būti būtent tokie, tada `@ApiProperty()` rašyti nereikia.

1. **`src/users/dto/user.dto.ts`**: atsakymo forma, kurią mato frontendas.
   ```ts
   export class UserDto {
       id: number;
       /** Vartotojo vardas */
       name: string;
       email: string;
   }
   ```
   Tai turi būti `class`, ne `interface`. Swagger iš interface schemos nesugeneruoja.

2. **`src/users/dto/create-user.dto.ts`**: užklausos kūnas su validacija.
   ```ts
   import { IsEmail, IsString, MinLength } from 'class-validator';

   export class CreateUserDto {
       @IsString()
       @MinLength(2)
       name: string;

       @IsEmail()
       email: string;
   }
   ```
   Plugin'as (`classValidatorShim`) `@MinLength` ir `@IsEmail` perkelia į OpenAPI schemą kaip `minLength` ir `format: email`. Taip ir orval zod schema gaus tas pačias taisykles.

3. **`src/users/users.service.ts`**: atmintyje laikomas `UserDto[]` masyvas ir `nextId` skaitiklis. Metodai:
   - `findAll(): UserDto[]`;
   - `findOne(id): UserDto`, kuris meta `NotFoundException`, jei vartotojo nėra;
   - `create(dto: CreateUserDto): UserDto`.

4. **`src/users/users.controller.ts`**: `@Controller('users')` su trimis endpoint'ais:
   - `@Get() findAll(): UserDto[]`;
   - `@Get(':id') findOne(@Param('id', ParseIntPipe) id: number): UserDto`;
   - `@Post() create(@Body() dto: CreateUserDto): UserDto`.

   Grąžinamo tipo anotacija būtina: iš jos plugin'as sugeneruoja response schemą.

5. **`src/users/users.module.ts`**: `UsersModule` su controller'iu ir service'u.

Visuose importuose naudosiu `.js` galūnes (ESM), kaip [src/app.module.ts](src/app.module.ts).

## Backendas: pakeitimai

- [src/app.module.ts](src/app.module.ts): į `imports` pridėti `UsersModule`.
- Paleisti `npm run openapi:generate`. Atnaujintame [openapi.json](openapi.json) atsiras:
  - keliai `/api/users` ir `/api/users/{id}`;
  - `operationId`: `Users_findAll`, `Users_findOne`, `Users_create`;
  - `components.schemas.UserDto` ir `components.schemas.CreateUserDto`.

## Frontendas (tik pavyzdys atsakyme, failų nekuriu)

Frontendo repo nėra šioje darbo vietoje, todėl atsakyme parodysiu:
- ką `npm run api:generate` sukurs:
  - `model/userDto.ts`;
  - `model/createUserDto.ts`;
  - `endpoints/users/users.ts` su `useUsersFindAll`, `useUsersFindOne`, `useUsersCreate`;
  - zod schemą `usersCreateBody`;
- trumpą `src/features/users/UsersPage.tsx` komponentą, kuris rodo sąrašą per `useUsersFindAll()` ir kuria vartotoją per `useUsersCreate()`;
- kas nutinka pakeitus lauką backende: pervadinus `name` į `fullName` ir sugeneravus abu failus iš naujo, frontendo `tsc` tiksliai parodys, kur taisyti.

## Patikrinimas

1. `npm run lint`: be klaidų.
2. `npm run openapi:generate`: `openapi.json` turi `UserDto` ir `CreateUserDto` schemas su `required`, `minLength` ir `format: email`.
3. `npm run start:dev`, tada patikrinti per curl:
   - `POST /api/users` su `{"name":"Jonas","email":"jonas@test.lt"}` turi grąžinti 201 ir `{id:1,...}`;
   - `POST /api/users` su blogu email turi grąžinti 400, nes veikia ValidationPipe;
   - `GET /api/users` turi grąžinti sąrašą;
   - `GET /api/users/99` turi grąžinti 404.
4. Swagger UI `http://localhost:3000/docs` turi rodyti Users grupę.

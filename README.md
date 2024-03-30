# Documentation
- [POSTMAN Documenter](https://documenter.getpostman.com/view/14857923/2sA35G4N6s)

# Instructions

### Deployed Server Address
- [Vercel](https://apollo-assignment-08.vercel.app) : [https://apollo-assignment-08.vercel.app](https://apollo-assignment-08.vercel.app)    

### Github Repo Link
- [Github](https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-foy4748)

### Explanation Video Link
- [Google Drive](https://drive.google.com/file/d/1M1s4frCcy9nsorupfLgXmCqzk27i3T7T/view?usp=sharing)


#### User Account
```json
{
	"email": "john@example.com",
	"password": "password"
}
```
## Used Technologies

- TypeScript
- ExpressJS
- Prisma (ORM)
- PostgresSQL
- SupaBase (Database Hosting)
- Vercel (Server Hosting)

## Running the server locally

First of all, install packages after cloning this repo. In this project, `pnpm` is used as package manager
```console
pnpm install
```

Then to start the server locally. You need to run this command below.
```console
pnpm run start:dev
```



### **Important**    
If you want to edit source code, and immediately reflect changes during development please run the given command below **in a different terminal.**

```console
tsc -w
```
If it throws error, (in case if you run this in powershell) run this below

```console
npx tsc -w
```
If you make some modification in the source code. Please run the command below before making any git commit or doing git push

```console
pnpm run prettier:fix
```
Then you can do a git commit and then push the code maintaining same code format for all developers working on this project.

To deploy this project to Vercel. Keep the vercel npm package installed globally    
```console
npm i -g vercel
```
Then simply run this command below to deploy your website
```console
pnpm run deploy
```

This command above will prettify the code base. Then run the build script then deploy to vercel in production mode. The command is a alias of the command below.    
```console
npx prettier --write src && tsc && vercel --prod
```


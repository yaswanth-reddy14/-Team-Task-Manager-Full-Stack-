# Railway Deployment Guide

Complete step-by-step guide for deploying the Team Task Manager on Railway.

## 📋 Prerequisites

1. **Railway Account**: Sign up at https://railway.app
2. **GitHub Repository**: Push your code to GitHub
3. **GitHub Access Token**: For Railway to access your repo

## 🚀 Step-by-Step Deployment

### Step 1: Connect GitHub to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select your repository containing this project
6. Choose your branch (usually `main`)

### Step 2: Add PostgreSQL Database

1. In Railway Dashboard, click **"Add Service"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically create a PostgreSQL instance
4. The `DATABASE_URL` environment variable is automatically set

### Step 3: Deploy Backend Service

#### Create Backend Service

1. Click **"New Service"** 
2. Select **"GitHub Repo"** (select your repository again)
3. Railway detects it's a Node.js project
4. Click **"Add Service"**

#### Configure Backend

1. Go to the backend service settings
2. Set **Root Directory** to `backend`
3. Under **Build**, verify:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Set Environment Variables

In the backend service variables, add:

```
NODE_ENV=production
JWT_SECRET=<GENERATE_A_STRONG_SECRET>
JWT_EXPIRE=7d
PORT=5000
```

**To generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Run Database Migration

After backend deploys:

1. Click the backend service
2. Go to **"Logs"** tab
3. Once you see "Server running on port 5000", proceed
4. Go back to **"Settings"**
5. Under **"Up Command"**, run:
   ```
   npm run migrate && npm start
   ```

#### Fix CORS for Frontend

After frontend URL is known (Step 4), update:
```
CORS_ORIGIN=https://<frontend-railway-url>
```

### Step 4: Deploy Frontend Service

#### Create Frontend Service

1. Click **"New Service"**
2. Select **"GitHub Repo"** (your repository)
3. Railway detects Node.js
4. Click **"Add Service"**

#### Configure Frontend

1. Go to the frontend service settings
2. Set **Root Directory** to `frontend`
3. Under **Build**, verify:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Click **"Generate Domain"** to create public URL

#### Set Environment Variables

In the frontend service variables, add:

```
REACT_APP_API_URL=https://<backend-railway-url>
NODE_ENV=production
```

Replace `<backend-railway-url>` with the actual Railway domain of your backend service (e.g., `https://task-manager-api-prod.railway.app`)

### Step 5: Link Services Together

1. In Railway Dashboard project view
2. You should see three services: PostgreSQL, Backend, Frontend
3. Click the backend service and look for "Database" connection
4. Verify PostgreSQL is linked (should show `DATABASE_URL` automatically)

### Step 6: Verify Deployment

1. **Frontend**: Click the frontend service → click the **Railway URL** domain
2. **Login/Register**: Create an account
3. **Test Features**:
   - Create a project
   - Add tasks
   - Check dashboard
   - Invite team members

## 🔄 Redeployment

Any push to your main branch triggers automatic redeployment:

1. Make changes locally
2. Commit: `git commit -m "message"`
3. Push: `git push origin main`
4. Railway automatically detects changes
5. Services redeploy automatically

## 📊 Monitor Deployments

### View Logs

1. Go to Railway Dashboard
2. Click the service (backend, frontend, or database)
3. Click **"Logs"** tab
4. Real-time logs display

### Check Service Status

Each service shows:
- ✅ Running - Service is active
- ⏳ Deploying - Currently deploying
- ❌ Crashed - Service error
- ⚠️ Starting - Initial startup

## 🔐 Security Best Practices

1. **JWT_SECRET**: Use a strong, random secret
   - Never use default/example secrets
   - Change it if exposed

2. **Environment Variables**: Keep sensitive data in Railway, never in code
   - Never commit `.env` files
   - Use Railway variables UI

3. **Database**: 
   - Use Railway's managed PostgreSQL
   - Access control through Railway
   - Automatic backups enabled

4. **HTTPS**: Railway automatically provides HTTPS

## 🚨 Troubleshooting

### Build Fails

**Error**: `npm: command not found`
- **Solution**: Ensure `package.json` exists in service root directory

**Error**: `Port already in use`
- **Solution**: Let Railway assign PORT automatically, don't hardcode

### Backend Crashes After Deploy

**Error**: `Database connection failed`
- **Solution**: 
  1. Verify `DATABASE_URL` is set
  2. Run `npm run migrate` in Up Command
  3. Check PostgreSQL service status

### Frontend Shows Blank Page

**Error**: `Cannot GET /`
- **Solution**:
  1. Verify `npm run build` command
  2. Check `REACT_APP_API_URL` is set correctly
  3. Ensure start command is `npm start`

### API 404 Errors from Frontend

**Error**: `POST /api/auth/login 404`
- **Solution**: 
  1. Verify backend is running
  2. Check `REACT_APP_API_URL` points to correct backend
  3. Check backend environment variables

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS`
- **Solution**:
  1. Update backend `CORS_ORIGIN` to include frontend Railway URL
  2. Redeploy backend
  3. Clear frontend cache

## 📈 Scaling

### Increase Compute

1. Click backend/frontend service
2. Go to **"Settings"**
3. Under **"Compute"**, select plan:
   - Free tier: Starting option
   - Growth: More resources
   - Pro: Production-grade

### Database Scaling

1. Click PostgreSQL service
2. Go to **"Settings"**
3. Upgrade plan as needed

## 💰 Pricing & Limits

- **Free Tier**: 
  - 1x shared CPU core
  - 512MB memory
  - Good for development/testing
  
- **Growth**: Production-ready resources
- **Pro**: Enterprise features

Check [railway.app/pricing](https://railway.app/pricing) for details.

## 🔧 Advanced Configuration

### Custom Domain

1. Go to service settings
2. Under **"Domains"**, add custom domain
3. Update DNS records with Railway details
4. Wait for DNS propagation

### Environment-Specific Configs

Create separate branches:
- `main`: Production
- `staging`: Staging
- `dev`: Development

Deploy each to separate Railway projects.

### Database Backups

1. Railway automatically backs up PostgreSQL
2. To restore: Contact Railway support

## 📞 Getting Help

- **Railway Docs**: https://docs.railway.app
- **Railway Status**: https://status.railway.app
- **Email Support**: support@railway.app

## ✅ Deployment Checklist

- [ ] GitHub repository created and synced
- [ ] Railway account set up
- [ ] PostgreSQL service created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Frontend URL works
- [ ] Can register/login
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Dashboard shows stats
- [ ] Overdue tasks alert working
- [ ] Team members can be added
- [ ] CORS errors resolved
- [ ] API calls working
- [ ] All features tested

## 🎉 Success!

Your Team Task Manager is now live on Railway! 

- **Frontend**: https://<your-frontend-railway-url>
- **API**: https://<your-backend-railway-url>
- **Database**: Managed by Railway

Enjoy managing tasks with your team!

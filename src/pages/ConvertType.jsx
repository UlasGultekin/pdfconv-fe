import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// ... other imports
  if (!SEO_META[convertType]) {
    return <Navigate to="/not-found" replace />;
  }
// ... 
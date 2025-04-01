import os
import requests
from urllib.parse import urljoin
from django.conf import settings
from django.core.files.storage import Storage
from django.utils.deconstruct import deconstructible

@deconstructible
class SupabaseStorage(Storage):
    def __init__(self):
        self.supabase_url = settings.SUPABASE_URL
        self.supabase_key = settings.SUPABASE_KEY
        self.bucket_name = settings.SUPABASE_BUCKET_NAME
        self.base_url = f"{self.supabase_url}/storage/v1/object/public/{self.bucket_name}/"
        
    def _headers(self):
        return {
            "apikey": self.supabase_key,
            "Authorization": f"Bearer {self.supabase_key}"
        }
        
    def _get_supabase_path(self, name):
        return name.replace('\\', '/')
        
    def _save(self, name, content):
        path = self._get_supabase_path(name)
        url = f"{self.supabase_url}/storage/v1/object/{self.bucket_name}/{path}"
        
        content.file.seek(0)
        file_data = content.file.read()
        
        response = requests.post(
            url,
            headers=self._headers(),
            data=file_data
        )
        
        if response.status_code not in [200, 201]:
            raise Exception(f"Failed to upload file to Supabase. Status: {response.status_code}, Response: {response.text}")
            
        return path
        
    def url(self, name):
        path = self._get_supabase_path(name)
        return urljoin(self.base_url, path)
        
    def exists(self, name):
        path = self._get_supabase_path(name)
        url = f"{self.supabase_url}/storage/v1/object/info/{self.bucket_name}/{path}"
        
        response = requests.head(url, headers=self._headers())
        return response.status_code == 200
    
    def delete(self, name):
        path = self._get_supabase_path(name)
        url = f"{self.supabase_url}/storage/v1/object/{self.bucket_name}/{path}"
        
        response = requests.delete(url, headers=self._headers())
        if response.status_code not in [200, 204]:
            raise Exception(f"Failed to delete file from Supabase. Status: {response.status_code}")
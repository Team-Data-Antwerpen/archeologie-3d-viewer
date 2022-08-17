import boto3, os.path, yaml 
from boto3.s3.transfer import TransferConfig
# dependencies: 
# boto3:
# --------------
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html
#
# pyyaml:
# --------------   
# https://pyyaml.org/wiki/PyYAMLDocumentation
# 
# Install: 
#   pip install boto3, pyyaml

# SECRETS ophalen
paswd_file = os.path.join( r'F:"path/to/secrets' , 'config.yml')
with open(paswd_file) as f:
    pass_dict = yaml.safe_load(f)

END_POINT = "https://s3-ant1.antwerpen.be"
FILE_ROOT = "path/to/pointclouds"
CLIENT_KEY = pass_dict['kw']['S3_LASER']['CLIENT_KEY'] 
SECRET =  pass_dict['kw']['S3_LASER']['SECRET'] 
TARGET = "acc-laserscans"

def main():
    session = boto3.session.Session(aws_access_key_id= CLIENT_KEY, 
                                    aws_secret_access_key= SECRET)
    s3 = session.resource("s3", endpoint_url= END_POINT)
    bucket = s3.Bucket(TARGET)
    
    config = TransferConfig(multipart_threshold=1024*25, max_concurrency=10,
                        multipart_chunksize=1024*25, use_threads=True)

    for root, _, files in os.walk(FILE_ROOT):
        if root.endswith('s3'): 
            continue
        for fname in files:
            # increase chuncksize and max_concurrency to improve upload speed.
            ContentType = "application/octet-stream" 
            if fname.endswith('.html') or fname.endswith('.htm'):
                ContentType= 'text/html'

            if fname.endswith('.js'):
                ContentType= 'text/javascript'

            if fname.endswith('.css'):
                ContentType= 'text/css'

            if fname.endswith('json'):
                ContentType= 'application/json'

            if fname.endswith('jpeg') or fname.endswith('jpg') :
                ContentType= 'image/jpeg'

            if fname.endswith('png'):
                ContentType= 'image/png'

            if fname.endswith('svg'):
                ContentType= 'image/svg+xml'

            if fname.endswith('gif'):
                ContentType= 'image/gif'

            if fname.endswith('.xml'): 
                ContentType = "text/xml" 

            dirName = root.replace( FILE_ROOT , '' ).replace( '\\' , '/' )
            targetF =  "data" + dirName + '/' + fname
            print ( "Uploading: ", targetF )
            bucket.upload_file( os.path.join(root, fname), targetF, 
                     Config= config, ExtraArgs={'ACL':'public-read', 'ContentType': ContentType} 
            )
    

if __name__ == "__main__":
   main()
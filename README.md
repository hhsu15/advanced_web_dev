# advanced web dev

## SSH

Secure Shell protocol.

You can purchase a remote server from [DigitalOcean](https://www.digitalocean.com/). Then you can ssh into that server from your terminal. Pretty cool!

You can cope file from local to the ssh remote server.

```bash
rsync -av . root@167.99.146.57:~/new_dir  # copy evrything to the remote directory

```

### Symmetrical encryption

Use key to encrypt and decrypt the message.

### Asymmetrical encryption

ASymmerical encryption uses `Key Exchange Algorithm`.

Unlike symetrical encryption, Asymmetrical encryption uses two keys. One is called public key, and the other one is called private key.

A message encrypted by public key can only be decrypted by the private key - one way relationship

Then, once the two keys are excahnged it can generate the Symmetrical encription thru something called `Difiie Hellman Key exchange`.

#### Difiie Hellman Key Exchange

Uses some piece of information to generate the symmtrical key so they never have to exchange the key in the public.

### Hashing

Hashing is used to check if the message being transfered are not tamppered(interfered by some bad guy).

Once the SSH chanel is established, we send the hashed message. For example, say we try to send password to the host. We will send the hashed passweord. This is something called MAC. The MAC itself is sent outside of the sysmmetrically encrypted area. The host, when received the actual password, uses the symmetric key, packet sequence number and run it thru the same hash function to generate the hash. If the hash matches it means the password was not tamppered.

This is the follow for ssh:

1. Diffie-Hellman Key Exchange
2. Arrive at Symmetric key
3. Make sure of no funny business by using Hashing
4. Authenticate User

### SSH setup

```bash

cd ~/.ssh

# generate ssh key
ssh-keygen -C "test@gmail.com"
# you will be propmpted to enter where to save it
# say "/Users/hsin/.ssh/id_rsa_test"
# this will give you a public key and a private key.
# then you can copy the pub key to share with your server
pbcopy ~/.ssh/id_rsa_test.pub

# Then on the host side (if you have control over it, say your server from digitalocean), you would paste the pub key to a file called "authorized_key" under ~/.ssh

# now to connect to the ssh, if you have muitple keys you need to do this first to add identity
ssh-add ~/.ssh/id_rsa_test

# now you should able to ssh to the server
ssh root@167.99.146.57

```

Recommended `ssh-keygen` command

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

To see your ssh identity,

```bash
ssh-add -l

```

To remove

```bash
ssd-add -D
```

## Performace 1 techniques

Shrink the file. This is standard nowadays for text files like .js .css. Images are the bottlenecks and main area to improve so let's focus on that.

For images like JPG(more colors, used for photos, can't make the background tranparent), SVG(quite different, for designer), PNG(less colors, smaller, used for logos), GIF (less color, smaller), it's more complex.

### Compression

Use [jpeg-optimizer](http://jpeg-optimizer.com/) or [tinypng](https://tinypng.com/)

### media query

The @metida for css. You can specify what image with what size you want to load depending on the screen size. The idea is if the screen is small you don't need to load big file thus save time. A media query looks like this:

```css
body {
  background: yellow;
}

/* when screen over 900px */
@media screen and (min-width: 900px) {
  body {
    background: url('./large-background.jpg') no-repeat center center fixed;
    background-size: cover;
  }
}

/* when screen is less than 500px */
@media screen and (max-width: 500px) {
  body {
    background: url('./small-background.jpg') no-repeat center center fixed;
    background-size: cover;
  }
}
```

### CDNs

Use CDNs (Content Delivery Network) like [imigx](https://www.imgix.com/). They provide API to optimize your images and give you back an URL for optimized images

### Remive the metadata for the images

Remove the metadata for images for security and reduce size

### Conclusion

Try to do these things to improve performance:

- minimize all text
- minimize all images
- media queries
- minimize # of files

#### Browser inspect to validate performance

You can go to Inspect -> Network and check off "Clear Cache" and choose "Slow 3G"

## Critical render path

This describes how things are being rendered onto the broswer.

DOM -> CSSOM (CSS object model) -> Render Tree -> Layout -> Paint

### Best practice:

#### For HTML

- have the css style tag in the beginning of the html. In the <head>
- have the script (javascript) tag in the end of the html (so it won't block the css in any case.). Before </body>

#### For CSS

- only load whatever is needed
- above fold loading (only show what you see, e.g, the scrolling loading feature) Do this thru some javascript.
- media attributes
- less specificity

#### Javascript

- Load Scripts asynchrously
  - loading java script is parse blocking (i.e., an alert code can stop the rest of html being loaded)
  - use this script with aysnc attribute <script async>
  - be careful, you use this only if the script you are loading is not changing the DOM
- defer loading of scripts
  - use <script defer>
  - this is similar to above async in that it loads the scripts without blocking loading the html content. It's different in that it starts executing the scripts after html loading is completely parsed.
  - rule of thumb:
    - your main script should use <script>
    - third party script should use <script asycn>
    - third party script that are not that import should use <script defer>
- minimize DOM manipulation
- avoid long running javascript

### To test your webpage performance

- webpagetest.org
  - you can specify the location and device where you want to test the performance from
- google PageSpeed Tools
  - developer tools

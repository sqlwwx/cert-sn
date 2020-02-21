/* global BigInt */
const crypto = require('crypto')
const forge = require('node-forge')

const X500DistinguishedNames = ['CN', 'OU', 'O', 'L', 'S', 'C']

const md5 = content => crypto
  .createHash('md5')
  .update(content)
  .digest('hex')

const getIssuerName = cert => {
  return cert.issuer.attributes.sort((a, b) => {
    return X500DistinguishedNames.indexOf(a.shortName) - X500DistinguishedNames.indexOf(b.shortName)
  }).map(item => `${item.shortName}=${item.value}`).join(',')
}

const getCertSn = cert => md5(
  getIssuerName(cert) + BigInt(`0x${cert.serialNumber}`)
)

module.exports = content => content
  .split('-----END CERTIFICATE-----')
  .filter(certContent => certContent.length > 925)
  .map(certContent => `${certContent}-----END CERTIFICATE-----`)
  .map(certContent => {
    try {
      return forge.pki.certificateFromPem(certContent)
    } catch (error) {
      return null
    }
  })
  .filter(cert => cert)
  .map(cert => getCertSn(cert))
  .join('_')

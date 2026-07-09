param(
  [Parameter(Mandatory = $true, Position = 0, ValueFromRemainingArguments = $true)]
  [string[]]$Pages
)

$headers = @{
  Authorization = "Bearer $env:LOGSEQ_API_TOKEN"
}

foreach ($page in $Pages) {
  $body = @{
    method = "logseq.Editor.getPage"
    args = @($page)
  } | ConvertTo-Json -Compress

  $result = Invoke-RestMethod -Uri $env:LOGSEQ_API_URL -Method Post -Headers $headers -ContentType "application/json" -Body $body
  [pscustomobject]@{
    page = $page
    found = $null -ne $result
    name = $result.name
    originalName = $result.'original-name'
    uuid = $result.uuid
  } | ConvertTo-Json -Compress
}

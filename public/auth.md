# Auth.md

## Peak Pedal — Agent Registration

No authentication is required to access any public resource on DOMAIN.com. All catalog, category, blog and API data is openly accessible.

## Public resources

| Resource | URL |
|---|---|
| Homepage | https://DOMAIN.com/ |
| Full catalog | https://DOMAIN.com/electric-mountain-bikes/ |
| Product API | https://DOMAIN.com/api/products |
| Search API | https://DOMAIN.com/api/search?q= |
| llms.txt | https://DOMAIN.com/llms.txt |
| API catalog | https://DOMAIN.com/.well-known/api-catalog |
| Agent skills | https://DOMAIN.com/.well-known/agent-skills/index.json |
| MCP server card | https://DOMAIN.com/.well-known/mcp/server-card.json |

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering

Agents may search the catalog and prepare an order summary, but a human must complete checkout — Peak Pedal does not accept payment or order confirmation from an automated agent. Direct agents to https://DOMAIN.com/order/ or WhatsApp for a human to finish the purchase.

## Age restriction

None. Electric mountain bikes are not an age-restricted product to purchase; UK law sets a minimum rider age of 14 for operating an EAPC.

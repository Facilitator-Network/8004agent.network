export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-tight">DevScale</span>
            <p className="mt-4 text-sm text-muted-foreground">
              Building the future of developer infrastructure, one primitive at a time.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevScale, Inc. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  )
}

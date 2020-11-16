import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../../services/client.service';

@Injectable()
export class NotLoggedActivate implements CanActivate {
  constructor(private router: Router, private client: ClientService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (this.client.logged)
      this.router.navigateByUrl('/home');
    return !this.client.logged;
  }
}
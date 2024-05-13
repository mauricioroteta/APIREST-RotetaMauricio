import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { USUARIOS } from '../../layouts/dashboard/pages/users/models';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, UsuariosService],
    });
    service = TestBed.inject(AuthService);
    usuariosService = TestBed.inject(UsuariosService);
  });

  it('Debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe indicarse en True si el token esta presente', () => {
    localStorage.setItem('user', 'test');
    const result = service.verifyToken();
    expect(result).toBeTrue();
  });

  it('Debe indicarse en False si el token esta presente', () => {
    localStorage.removeItem('user');
    const result = service.verifyToken();
    expect(result).toBeFalse();
  });

  it('Debe iniciar sesión correctamente y asignar propiedad isAdmin', (done: DoneFn) => {
    const mockUsuarios: USUARIOS[] = [
        {
            "id": 1,
            "userName": "admin",
            "nombre": "nombre",
            "apellido": "apellido",
            "telefono": "telefono",
            "password": "pass",
            "email": "correo1@mail.com",
            "activo": true,
            "rol": "ADMIN",
            "avatar": "avatar",
          },
    ];
    spyOn(usuariosService, 'getUsuarios').and.returnValue(of(mockUsuarios));

    service.login('admin', 'admin').subscribe(() => {
      expect((service as any).isAdmin).toBeTrue();
      done();
    });
  });

  it('Debe cerrar sesión y llamar al método router.navigate', () => {
    localStorage.setItem('user', 'admin');
    localStorage.setItem('rol', 'admin');
    localStorage.setItem('nombre', 'admin');
    const isLoggedInSubjectNextSpy = spyOn((service as any).isLoggedInSubject, 'next');
    const SpyOnrouterNavigate = spyOn((service as any).router, 'navigate');
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('rol')).toBeNull();
    expect(isLoggedInSubjectNextSpy).toHaveBeenCalledWith(false);
    expect(SpyOnrouterNavigate).toHaveBeenCalledWith(['']);
  });

});

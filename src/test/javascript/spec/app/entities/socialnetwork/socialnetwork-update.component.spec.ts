/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SociallinksTestModule } from '../../../test.module';
import { SocialnetworkUpdateComponent } from 'app/entities/socialnetwork/socialnetwork-update.component';
import { SocialnetworkService } from 'app/entities/socialnetwork/socialnetwork.service';
import { Socialnetwork } from 'app/shared/model/socialnetwork.model';

describe('Component Tests', () => {
    describe('Socialnetwork Management Update Component', () => {
        let comp: SocialnetworkUpdateComponent;
        let fixture: ComponentFixture<SocialnetworkUpdateComponent>;
        let service: SocialnetworkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SociallinksTestModule],
                declarations: [SocialnetworkUpdateComponent]
            })
                .overrideTemplate(SocialnetworkUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialnetworkUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialnetworkService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Socialnetwork(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.socialnetwork = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Socialnetwork();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.socialnetwork = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

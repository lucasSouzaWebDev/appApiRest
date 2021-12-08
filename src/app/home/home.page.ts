import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Clube } from '../clube';
import { ClubeService } from '../clube.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  time = {} as Clube;
  times : Clube[];

  constructor(public clubeService : ClubeService, public toast : ToastController) {}

  ngOnInit() {
    this.getTimes();
  }

  getTimes() {
    this.clubeService.getTimes()
    .subscribe((times : Clube[]) => {
      this.times = times;
      console.log(times);
    });
    
  }

  salvar() {
    if(this.time.id != undefined){
      this.clubeService.updateTime(this.time)
      .subscribe(() => {
        this.presentToast("Atualizou o Time!");
      });
    }else{
      this.clubeService.saveTime(this.time)
      .subscribe(() => {
        this.presentToast("Criou o Time!");
      });
    }
  }

  editar(time : Clube){
    this.time = time;
  }

  excluir(time : Clube){
      this.clubeService.deleteTime(time)
      .subscribe(() => {
        this.presentToast("Excluiu o Time!");
      });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

}
